import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userPool from "../../cognitoConfig";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log("Sign in successful!", result);
        setMessage("Success! You are signed in.");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      },
      onFailure: (error) => {
        console.error("Sign in error: ", error);
        setMessage(`Error: ${error.message}`);
      },
    });
  };
  return (
    <div className="auth-container">
      <h2>Sign In</h2>

      <form className="auth-form" onSubmit={handleSignIn}>
        <div className="auth-input">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-input">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="auth-button" type="submit">
          Sign In
        </button>
      </form>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
};

export default SignIn;
