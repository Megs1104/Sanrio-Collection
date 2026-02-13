import { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import userPool from "../../cognitoConfig";
import { useLocation } from "react-router-dom";

import React from "react";

const VerifyEmail = () => {
  const location = useLocation();

  const [email] = useState(location.state?.email || "your email");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, (error, result) => {
      if (error) {
        console.error("Verification error:", error);
        setMessage(`Error: ${error.messsage}`);
        return;
      }
      console.log("Verification successful:", result);
      setMessage("Your email has been verified. You can now sign in.");
    });
  };
  return (
    <div className="auth-container">
      <h2>Verify Email</h2>
      <p>Check {email} for your verification code.</p>
      <form className="auth-form" onSubmit={handleVerify}>
        <div className="auth-input">
          <label>Verification Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
            maxLength={6}
            required
          />
        </div>
        <button className="auth-button" type="submit">
          Verify
        </button>
      </form>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
};

export default VerifyEmail;
