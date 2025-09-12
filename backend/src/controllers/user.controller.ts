import User from "../models/user.model.ts";
import bcrypt from "bcryptjs";
import { createAccessToken, verifiyAccessToken } from "../lib/jwt.ts";
import type { Request, Response } from "express";
import type { RegisterBody } from "../types/user.types.ts";

export const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response
) => {
  try {
    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound) {
      res.status(400).json({ message: "El usuario ya existe" });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({
      id: userSaved._id.toString(),
      username: userSaved.username,
      email: userSaved.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    res.status(201).json({
      id: userSaved._id.toString(),
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (!userFound) {
      res.status(400).json({ message: "Usuario no existe, registrese" });
      return;
    }

    const matchPassword = await bcrypt.compare(password, userFound.password);
    if (!matchPassword) {
      res.status(400).json({ message: "Contraseña inválida" });
      return;
    }

    const token = await createAccessToken({
      id: userFound._id.toString(),
      username: userFound.username,
      email: userFound.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      id: userFound._id.toString(),
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  res.status(200).json({ message: "Logout successfully" });
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const payload = await verifiyAccessToken(token);

    const userFound = await User.findById(payload.id);

    if (!userFound) {
      res.status(401).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json(userFound);
    return;
  } catch (error) {
    console.error("Error en verifyToken", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
