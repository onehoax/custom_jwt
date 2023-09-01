import * as fs from "node:fs";
import jwt from "jsonwebtoken";

const privateKey: string = fs.readFileSync("./private.pem", "utf-8");
const publicKey: string = fs.readFileSync("./public.pem", "utf-8");

/**
 * @remarks
 * Options for signing the token
 * - **issuer** - Software organization that issues the token (e.g.: "My Corp")
 * - **subject** - Intended user of the token (e.g.: some@user.com)
 * - **audience** - Identity of the intended recipient of the token (e.g.: "http//someclient.io")
 * - **expiresIn** - Expiration time after which the token will be invalid (e.g.: "12h", "30d")
 * - **algorithm** - Encryption algorithm to encrypt the token  with the private key (e.g.: "RS256")
 */
type Options = {
    issuer: string;
    subject: string;
    audience: string;
    expiresIn: string;
    algorithm: jwt.Algorithm;
};

/**
 * Signs and returns the JWT using the given payload, options, and the private key
 * @param payload - Literal object containing the data to be included in the tokem
 * @param options - Options for signing the token
 * @returns - A JWT
 * @throws an error if jwt.verify fails
 */
function sign(payload: object, options: Options): string {
    const signOptions = {
        issuer: options.issuer,
        subject: options.subject,
        audience: options.audience,
        expiresIn: options.expiresIn,
        algorithm: options.algorithm
    };

    try {
        return jwt.sign(payload, privateKey, signOptions);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

/**
 * Verify the JWT using the given token, options, and the public key
 * @param token - The JWT
 * @param options - Options for signing the token
 * @returns - A string | jwt.JwtPayload representing the contents of the token
 * @throws an error if jwt.verify fails
 */
function verify(token: string, options: Options): string | jwt.JwtPayload {
    const verifyOptions = {
        issuer: options.issuer,
        subject: options.subject,
        audience: options.audience,
        expiresIn: options.expiresIn,
        algorithm: [options.algorithm]
    };

    try {
        return jwt.verify(token, publicKey, verifyOptions);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

/**
 * Decodes a JWT and returns a jwt.JWT representing the contents of the token
 * @param token - A JWT
 * @returns - A jwt.JWT
 */
function decode(token: string): jwt.Jwt | null {
    try {
        return jwt.decode(token, { complete: true });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export { Options, sign, verify, decode };
