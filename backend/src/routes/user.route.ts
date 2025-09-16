import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema.js";
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/user.controller.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

export const RouterAuth: ReturnType<typeof Router> = Router();

RouterAuth.post("/register", validateSchema(registerSchema), register);
RouterAuth.post("/logout", logout);
RouterAuth.post("/login", validateSchema(loginSchema), login);
RouterAuth.get("/verify", verifyToken);
