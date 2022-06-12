import {createContext, useContext, useState } from "react";

interface Login {
  uuid: string
  email: string
  exp: number
}

const LoginContext = createContext<Login | null>(null);
const UpdateLoginContext = createContext<undefined | (() => Promise<void>)>(undefined); 
const LogoutContext = createContext<undefined | (() => void)>(undefined)

const decodeToken = (token: string): Login => {
  const base64 = token.split(".")[1];
  const dataString = decodeURIComponent(window.atob(base64));
  return JSON.parse(dataString);
}

const getNewAccessToken = async (refreshToken: string) => {
  const res = await fetch(`http://localhost:8080/authentication/token`, {
    method: "POST",
    headers: {
      refreshToken
    }
  }); 

  if(!res.ok) {
    return null;
  }

  return await res.text();
}

export const useLogin = () => {
  return useContext(LoginContext);
};

export const useUpdateLogin = () => {
  return useContext(UpdateLoginContext);
}

export const useLogout = () => {
  return useContext(LogoutContext);
}

export const LoginProvider = ({children}: {children: JSX.Element}) => {
  const [loginData, setLoginData] = useState<Login | null>(null);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLoginData(null);
  }

  const updateLogin = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if(accessToken === null || refreshToken == null) {
      setLoginData(null);
      return;
    }

    const accessTokenData = decodeToken(accessToken); 
    const refreshTokenData = decodeToken(refreshToken);
    
    if(new Date() > new Date(accessTokenData.exp)) {
      setLoginData(accessTokenData);
    } else if(new Date() > new Date(refreshTokenData.exp)) {
      const newAccessToken = await getNewAccessToken(refreshToken) 
      if(newAccessToken !== null) {
        setLoginData(decodeToken(newAccessToken));
        localStorage.setItem("accessToken", newAccessToken);
      }
    } else {
      logout();
    }
  }

  return <LoginContext.Provider value={loginData}>
    <UpdateLoginContext.Provider value={updateLogin}> 
      <LogoutContext.Provider value={logout}>
        {children}
      </LogoutContext.Provider>
    </UpdateLoginContext.Provider>
  </LoginContext.Provider>
} 