import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().nonempty("Username es requerido").min(3).max(20),
  email: z.string().nonempty("Email es requerido").email("Email inválido"),
  password: z
    .string()
    .nonempty("Contraseña es requerida")
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(20),
});

export const loginSchema = z.object({
  email: z.string().nonempty("Email es requerido").email("Email inválido"),
  password: z
    .string()
    .nonempty("Contraseña es requerida")
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(20),
});
