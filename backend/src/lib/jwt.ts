import dotenv from "dotenv";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export interface AccessTokenPayload extends JwtPayload {
  id: string;
  username: string;
  email: string;
}

export function createAccessToken(
  payload: AccessTokenPayload,
  options: SignOptions = { expiresIn: "2h" }
): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, options, (err, token) => {
      if (err || !token) return reject(err);
      resolve(token);
    });
  });
}

export function verifiyAccessToken(
  token: string
): Promise<jwt.JwtPayload & AccessTokenPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err || !decoded || typeof decoded !== "object") return reject(err);

      resolve(decoded as jwt.JwtPayload & AccessTokenPayload);
    });
  });
}
