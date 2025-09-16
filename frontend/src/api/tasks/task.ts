import type {
  CreateTask,
  ListOfTasks,
  TaskPublic,
} from "../../types/task.type";
import axios from "./axiosTask";

export const createTaskRequest = (task: CreateTask) =>
  axios.post<TaskPublic>("/create", task).then((res) => res.data);

export const getTasksRequest = (): Promise<ListOfTasks> =>
  axios.get<ListOfTasks>("/all").then((res) => res.data);

export const updateTaskRequest = (
  id: string,
  task: Partial<CreateTask>
): Promise<TaskPublic> =>
  axios.patch<TaskPublic>(`/update/${id}`, task).then((res) => res.data);

export const deleteTaskRequest = (id: string) => axios.delete(`/delete/${id}`);
