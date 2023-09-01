[@onehoax/jwt](../README.md) / index

# Module: index

## Table of contents

### Type Aliases

- [Options](index.md#options)

### Functions

- [decode](index.md#decode)
- [sign](index.md#sign)
- [verify](index.md#verify)

## Type Aliases

### Options

Ƭ **Options**: `Object`

**`Remarks`**

Options for signing the token
- **issuer** - Software organization that issues the token (e.g.: "My Corp")
- **subject** - Intended user of the token (e.g.: some@user.com)
- **audience** - Identity of the intended recipient of the token (e.g.: "http//someclient.io")
- **expiresIn** - Expiration time after which the token will be invalid (e.g.: "12h", "30d")
- **algorithm** - Encryption algorithm to encrypt the token  with the private key (e.g.: "RS256")

#### Type declaration

| Name | Type |
| :------ | :------ |
| `algorithm` | `jwt.Algorithm` |
| `audience` | `string` |
| `expiresIn` | `string` |
| `issuer` | `string` |
| `subject` | `string` |

#### Defined in

index.ts:17

## Functions

### decode

▸ **decode**(`token`): `jwt.Jwt` \| ``null``

Decodes a JWT and returns a jwt.JWT representing the contents of the token

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | A JWT |

#### Returns

`jwt.Jwt` \| ``null``

- A jwt.JWT

#### Defined in

index.ts:78

___

### sign

▸ **sign**(`payload`, `options`): `string`

Signs and returns the JWT using the given payload, options, and the private key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `object` | Literal object containing the data to be included in the tokem |
| `options` | [`Options`](index.md#options) | Options for signing the token |

#### Returns

`string`

- A JWT

**`Throws`**

an error if jwt.verify fails

#### Defined in

index.ts:32

___

### verify

▸ **verify**(`token`, `options`): `string` \| `jwt.JwtPayload`

Verify the JWT using the given token, options, and the public key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | The JWT |
| `options` | [`Options`](index.md#options) | Options for signing the token |

#### Returns

`string` \| `jwt.JwtPayload`

- A string | jwt.JwtPayload representing the contents of the token

**`Throws`**

an error if jwt.verify fails

#### Defined in

index.ts:56
