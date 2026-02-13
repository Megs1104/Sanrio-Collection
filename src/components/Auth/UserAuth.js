import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  isAuthenticated,
  signOut,
  getUserEmail,
} from "../../utils/authAssistance";

const UserAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = isAuthenticated();
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        try {
          const email = await getUserEmail();
          setUserEmail(email || "User");
        } catch (error) {
          console.error("Error getting email: ", error);
        }
      }
    };
    checkAuth();
  }, []);

  const handleSignOut = () => {
    signOut();
    setIsLoggedIn(false);
    setUserEmail("");
    window.location.reload();
  };

  return (
    <div className="auth-buttons-container">
      {isLoggedIn ? (
        <div>
          <button className="auth-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className="auth-options-container">
          <button className="auth-button" onClick={() => navigate("/sign-in")}>
            Sign In
          </button>
          <p>or</p>
          <button className="auth-button" onClick={() => navigate("/sign-up")}>
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAuth;
