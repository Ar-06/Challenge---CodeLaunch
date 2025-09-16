import type { AxiosError } from "axios";
import { useCallback, useState } from "react";
import type { CreateTask, ListOfTasks } from "src/types/task.type";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../../api/tasks/task";
import { TaskContext } from "./taskContext";

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<ListOfTasks>([]);
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const clearErrors = () => setErrors([]);

  const handleError = (err: unknown) => {
    const error = err as AxiosError<{
      errors?: string[];
      message?: string;
    }>;

    if (Array.isArray(error.response?.data?.errors)) {
      setErrors(error.response.data.errors);
    } else if (error.response?.data?.message) {
      setErrors([error.response.data.message]);
    } else {
      setErrors(["Error inesperado en el servidor"]);
    }
  };

  const getTasks = useCallback(async () => {
    setLoadingGet(true);
    try {
      const res = await getTasksRequest();
      setTasks(res);
    } catch (err) {
      handleError(err);
    } finally {
      setLoadingGet(false);
    }
  }, []);

  const createTask = async (task: CreateTask) => {
    setLoadingCreate(true);
    try {
      const newTask = await createTaskRequest(task);
      setTasks([...tasks, newTask]);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoadingCreate(false);
    }
  };

  const toggleTask = async (id: string, completed: boolean) => {
    const prevTasks = [...tasks];
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed } : t)));

    try {
      await updateTaskRequest(id, { completed });
    } catch (err: unknown) {
      setTasks(prevTasks);
      handleError(err);
    }
  };

  const updateTask = async (id: string, task: Partial<CreateTask>) => {
    setLoadingUpdate(true);
    try {
      const updated = await updateTaskRequest(id, task);
      setTasks(tasks.map((t) => (t.id === id ? updated : t)));
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const deleteTask = async (id: string) => {
    setLoadingDelete(true);
    try {
      await deleteTaskRequest(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadingCreate,
        loadingDelete,
        loadingGet,
        loadingUpdate,
        createTask,
        getTasks,
        updateTask,
        toggleTask,
        deleteTask,
        errors,
        clearErrors,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
