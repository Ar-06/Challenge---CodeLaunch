import { z } from "zod";

export const registerAndLoginSchema = z.object({
  email: z.string().nonempty("Email es requerido").email("Email inválido"),
  password: z
    .string()
    .nonempty("Contraseña es requerida")
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(20),
});
