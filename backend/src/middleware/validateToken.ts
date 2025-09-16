import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import { verifiyAccessToken } from "../lib/jwt.js";

dotenv.config();

export const authRequires = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const payload = await verifiyAccessToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};
