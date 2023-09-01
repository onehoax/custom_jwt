import jwt from "jsonwebtoken";
import * as customJwt from "./index.js";

// ==================== JWT Sign ====================
const payload = {
    userId: "1",
    userType: "admin"
};

const issuer: string = "My Corp";
const subject: string = "some@user.com";
const audience: string = "http://someclient.io";
const expiresIn: string = "30d";
const algorithm: jwt.Algorithm = "RS256";

const options = {
    issuer: issuer,
    subject: subject,
    audience: audience,
    expiresIn: expiresIn,
    algorithm: algorithm
};

const token: string = customJwt.sign(payload, options);
console.log("JWT token:\n", token);

// ==================== JWT Verify ====================
const result = customJwt.verify(token, options);
console.log("JWT verification result:\n", result);

console.log(customJwt.decode(token));
