import { CognitoUser } from "amazon-cognito-identity-js";
import userPool from "../cognitoConfig";

export const getCurrentUser = () => {
  return userPool.getCurrentUser();
};

export const isAuthenticated = () => {
  const user = getCurrentUser();
  return user !== null;
};

export const signOut = () => {
  const user = getCurrentUser();
  if (user) {
    user.signOut();
  }
};

export const getUserEmail = () => {
  return new Promise((resolve, reject) => {
    const user = getCurrentUser();
    if (!user) {
      resolve(null);
      return;
    }

    user.getSession((error, session) => {
      if (error) {
        reject(error);
        return;
      }
      user.getUserAttributes((error, attributes) => {
        if (error) {
          reject(error);
          return;
        }
        const emailAttribute = attributes.find(
          (attribute) => attribute.Name === "email",
        );
        resolve(emailAttribute ? emailAttribute.Value : null);
      });
    });
  });
};

export const getUserId = () => {
  return new Promise((resolve, reject) => {
    const user = getCurrentUser();

    if (!user) {
      reject(new Error("No user logged in."));
      return;
    }

    user.getSession((error, session) => {
      if (error) {
        reject(null);
        return;
      }

      const idToken = session.getIdToken();
      const userId = idToken.payload.sub;

      resolve(userId);
    });
  });
};

export const getIdToken = () => {
  return new Promise((resolve, reject) => {
    const user = getCurrentUser();
    if (!user) {
      reject(new Error("No user logged in."));
      return;
    }
    user.getSession((error, session) => {
      if (error) {
        reject(error);
        return;
      }
      const idToken = session.getIdToken().getJwtToken();
      resolve(idToken);
    });
  });
};
