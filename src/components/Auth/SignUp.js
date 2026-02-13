import { useState } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import userPool from "../../cognitoConfig";

const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Password must contain at least one special character.";
  }
  return null;
};

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const passwordError = validatePassword(password);
    if (passwordError) {
      setMessage(passwordError);
      return;
    }

    const attributeList = [];

    const dataEmail = {
      Name: "email",
      Value: email,
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    userPool.signUp(email, password, attributeList, null, (error, result) => {
      if (error) {
        console.error("Sign up error;", error);
        setMessage(`Error: ${error.message}`);
        return;
      }
      console.log("Sign up result:", result);
      setMessage("Success! Check your email for verification code.");
      navigate("/verify-email", { state: { email: email } });
    });
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>

      <form className="auth-form" onSubmit={handleSignUp}>
        <div className="auth-input">
          <label>Email </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-input">
          <label>Password </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="auth-button" type="submit">
          Sign Up
        </button>
      </form>

      {message && <p className="auth-message">{message}</p>}
    </div>
  );
};

export default SignUp;
