# Custom JWT Implementation

JWT implementation with asymetric key encryption and some standard options; follows
[this Medium article](https://siddharthac6.medium.com/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e).

## JWTs

JWTs should be passed client-side to store and then further use/add in each and every request (preferably in the header) as Token of authorization and identity.

## Asymetric Key Encryption

I use asymetric key pairs for encrypting and verifying JWTs; the private key is used
to encrypt, the public one to verify/decrypt.

You can use a site like [this](https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/)
to generate private-public key pairs; alternatively, you can use CL programs such as openssl.

**_NOTE:_**

-   Choose 2048 as the key size if you want to use `RS256` as the encryption algorithm because the `jsonwebtoken` node package requires it
-   `PKCS #8` is the standard format scheme for RSA keys
-   **DO NOT** commit the private-public key pairs to your remote repo; generate new pairs for each project and place them in the appropriate local location

## Options

When a user makes a login request, say he's passing his email and password. Along with email
and password, the client must pass a client identity ( [payload + clientID] ), for the server
to know for whom the token is to be signed.
Later for subsequent API requests with [payload + token + clientID], the server, while
verifying the token will also check if the client claims to be the one this token was issued
for. This clientID is usually the `audience` in the `Options`.

E.g.: If a JWT was issued for audience — “http://abc.in”, But the client app tries to use the
JWT from “http://xyz.in”, then the server should throw 403 Forbidden error as the audience
identification fails to match.

## Usage

-   Install: `npm i @onehoax/jwt`
-   This is an ES module; therefore use `"type": "module"` in your `package.json`
-   Place the private-public key pair in the root directory of the project
