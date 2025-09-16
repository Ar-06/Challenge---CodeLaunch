export type CreateTask = {
  title: string;
  description: string;
  completed: boolean;
};

export type TaskPublic = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export type ListOfTasks = TaskPublic[];
