import { createContext } from "react";
import type { CreateTask, ListOfTasks } from "src/types/task.type";

interface TaskProviderProps {
  tasks: ListOfTasks;
  loadingGet: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  createTask: (task: CreateTask) => Promise<void>;
  getTasks: () => Promise<void>;
  updateTask: (id: string, task: Partial<CreateTask>) => Promise<void>;
  toggleTask: (id: string, completed: boolean) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  errors: string[];
  clearErrors: () => void;
}

export const TaskContext = createContext<TaskProviderProps | undefined>(
  undefined
);
