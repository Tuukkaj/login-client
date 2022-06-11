import { useEffect, useState } from "react";
import { TextField, PrimaryButton, MessageBar, MessageBarType, DefaultButton } from "@fluentui/react";
import {useNavigate} from "react-router-dom";
import { useLogin } from "../hooks/LoginContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);
  const login = useLogin();
  const navigate = useNavigate();

   const postLogin = async (email: string, password: string) => {
    const res = await fetch("http://localhost:8080/authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
  
    if(!res.ok) {
      setError("Login failed :(");
      return;
    }

    const {accessToken, refreshToken} = await res.json();
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    navigate("../user")
  }

  useEffect(() => {
    if(login) {
      navigate("../user")
    }
  }, [login, navigate])
  

  return <div className="container-fluid">
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-8 col-lg-6">
        <h4>Log in</h4>
        <TextField label="Email"
            required
            placeholder="user@email.com"
            type="email"
            value={email} 
            onChange={e => setEmail(e.currentTarget.value)} />
          <TextField label="Password"
            required
            placeholder="reallyGoodPassword1234"
            type={"password"}
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
            canRevealPassword />
          <PrimaryButton className="mt-3 me-3"
           iconProps={{iconName: "FollowUser"}}
            onClick={() => postLogin(email, password)}>
            Login
          </PrimaryButton>
          <DefaultButton className="mt-3"
           iconProps={{iconName: "StatusCircleQuestionMark"}}
            onClick={() => navigate("/forgot")}>
            Reset password
          </DefaultButton>
          {error && <MessageBar className="mt-3" messageBarType={MessageBarType.severeWarning}>
            {error}
          </MessageBar>}
      </div>
    </div>
  </div>
}