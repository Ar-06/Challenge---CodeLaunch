import type { AccessTokenPayload } from "../lib/jwt.ts";

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

export {};
