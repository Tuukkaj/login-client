import { MessageBar, MessageBarType, PrimaryButton, TextField } from "@fluentui/react";
import { useState } from "react";
import Back from "../components/common/Back";

enum ForgotPasswordState {
  OK,
  NO_EMAIL,
  ERROR,
  EMPTY
}

const menuBarInfo = (response: ForgotPasswordState) => {
  switch(response) {
    case ForgotPasswordState.OK: return {
      type: MessageBarType.success,
      text: "Forgot password email has been sent if user exists"
    }
    case ForgotPasswordState.ERROR: return {
      type: MessageBarType.severeWarning,
      text: "Forgot password email sending failed"
    }
    default: return; 
  }
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<ForgotPasswordState>(ForgotPasswordState.EMPTY); 
   
  const sendForgotPassword = async () => {
    if(email.length === 0) {
      setState(ForgotPasswordState.NO_EMAIL);
      return;
    }

    const res = await fetch(`http://localhost:8080/authentication/forgot/${email}`, {
      method: "PUT"
    });
    if(res.ok) {
      setState(ForgotPasswordState.OK);
    } else {
      setState(ForgotPasswordState.ERROR);
    }
  }

  const menuBar = menuBarInfo(state); 
  
  return <>
  <Back to="/"/>
  <div className="container-fluid">
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="row mt-5 text-left">
          <div className="col">
            <h4>Forgot password?</h4>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <TextField
              required
              label="Email"
              errorMessage={state === ForgotPasswordState.NO_EMAIL ? "Password missing" : undefined}
              placeholder="user@email.com"
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
              type="email"/>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <PrimaryButton onClick={sendForgotPassword} className="mt-2" iconProps={{iconName: "MailForward"}}>
              Reset password
            </PrimaryButton>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            {menuBar === undefined ? null : <MessageBar messageBarType={menuBar?.type}> 
            {menuBar?.text}
            </MessageBar>}
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
}