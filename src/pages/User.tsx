import { DefaultButton, MessageBar, MessageBarType, PrimaryButton, Text } from "@fluentui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin, useLogout } from "../hooks/LoginContext";



export default function User() {
  const login = useLogin();
  const logout = useLogout();
  const navigate = useNavigate();
  const [testResponse, setTestResponse] = useState(false);

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
    
    setTestResponse(true);
  }

  const onClickLogout = () => {
    logout?.();
    navigate("/")
  }

  return <div className="container-fluid">
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-8 col-lg-6">
        <h4>User</h4>
        <div>
          <Text>
            <b>Email:</b> {login?.email}
          </Text>
        </div>
        <div>
          <Text>
            <b>UUID:</b> {login?.uuid}
          </Text>
        </div>
        <div>
          <Text>
            <b>EXP:</b> {login?.exp}
          </Text>
        </div>
        <div className="mt-2">
          <PrimaryButton iconProps={{iconName: "TestBeaker"}} onClick={test} className="me-2">
            Test
          </PrimaryButton>
          <DefaultButton iconProps={{iconName: "UserRemove"}} onClick={onClickLogout}>
            Logout
          </DefaultButton>
        </div>
       {testResponse ? <MessageBar messageBarType={MessageBarType.success} className="mt-2">
         Login OK 
       </MessageBar> : null}
      </div>
    </div>    
  </div>
}