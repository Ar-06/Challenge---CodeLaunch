import { z } from "zod";

export const registerTaskSchema = z.object({
  title: z.string().nonempty("Título es requerido"),
  description: z.string(),
});
