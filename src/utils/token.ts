import { jwtVerify, importSPKI } from "jose";

const ALG = "RS256";
const SPKI = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr9DYMSqGJ8PsbHJ4H3V3
61EZu09STGXiH86BWJxxCuRB5bojYf4lvbl5rA2i3+D3/eOt+DEHjQkHWxs8wuxb
4gCSpDYyEIbanX1as8jKxV4iOJNOJVLmEgSjHPP/Eh7Yb1wxfGdMShtpFZ/q8wtI
sT3E7t4n6hBJKueapf9ZorA5zV3OPVniLZ5vR4GWTPE+hImaYZXIsfUMaZ5Wpoc0
APmHUqjLU9xr3oynxUmV/LL1YmB6T3tWxdcoIA/fFmVkWf69+sigsBpPx/QCUc80
tLr4wb41j9ojYV5XsrLEtu62Mw9P93O5qjEt/VeEeyX7wTW80dgb5yoGB0wEUunI
wwIDAQAB
-----END PUBLIC KEY-----`

const PUBLIC_KEY = await importSPKI(SPKI, ALG);

const decode = async (token: string) => {
    const decodedToken = await jwtVerify(token, PUBLIC_KEY);
    return decodedToken;
}

const getUserId = async (token: string) => {
    try {
        const { payload } = await decode(token);
        return payload.sub;
    } catch (error) {
        console.error(error);
    }
}

export { getUserId };
