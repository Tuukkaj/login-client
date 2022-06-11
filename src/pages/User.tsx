import { PrimaryButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { useLogin, useLogout } from "../hooks/LoginContext";



export default function User() {
  const login = useLogin();
  const logout = useLogout();
  const navigate = useNavigate();

  const test = async () => {
    const accessToken = localStorage.getItem("accessToken");
  
    const res = await fetch("http://localhost:8080/test/", {
      method: "POST",
      headers: {
        authorization: "Bearer " + accessToken
      }
    }) 
  
    if(res.status === 401) {
      navigate("/")
    }
    console.log(res)
  }

  const onClickLogout = () => {
    logout?.();
    navigate("/")
  }

  console.dir(login);

  return <div>
    {login?.email}
    <PrimaryButton onClick={test}>
      Test
    </PrimaryButton>
    <PrimaryButton onClick={onClickLogout}>
      Logout
    </PrimaryButton>
  </div>
}