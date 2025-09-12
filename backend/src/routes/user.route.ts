import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema.ts";
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/user.controller.ts";
import { registerSchema, loginSchema } from "../schemas/auth.schema.ts";

export const RouterAuth: ReturnType<typeof Router> = Router();

RouterAuth.post("/register", validateSchema(registerSchema), register);
RouterAuth.post("/logout", logout);
RouterAuth.get("/login", validateSchema(loginSchema), login);
RouterAuth.get("/verify", verifyToken);
