import { Router } from "express";
import { authRequires } from "../middleware/validateToken.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { registerTaskSchema } from "../schemas/task.schema.js";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";

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
