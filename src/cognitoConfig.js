import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-west-2_wQ5k0Yd4r",
  ClientId: "2k192o8ftd7gsurnocpv4pdpu4",
};

const userPool = new CognitoUserPool(poolData);

export default userPool;
