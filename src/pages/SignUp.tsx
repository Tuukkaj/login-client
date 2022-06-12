import { PrimaryButton, TextField } from "@fluentui/react";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postSignUp = (email: string, password: string) => {

  }

  return <>
  <div className="container-fluid">
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-8 col-lg-6">
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
            onClick={() => postSignUp(email, password)}>
            Login
          </PrimaryButton>
       </div>
      </div>
    </div>         
  </>
}