import { Router } from "express";
import { authRequires } from "../middleware/validateToken.ts";
import { validateSchema } from "../middleware/validateSchema.ts";
import { registerTaskSchema } from "../schemas/task.schema.ts";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.ts";

export const RouterTask: ReturnType<typeof Router> = Router();

RouterTask.post(
  "/create",
  authRequires,
  validateSchema(registerTaskSchema),
  createTask
);
RouterTask.patch("/update/:id", authRequires, updateTask);
RouterTask.get("/all", authRequires, getTasks);
RouterTask.delete("/delete/:id", authRequires, deleteTask);
