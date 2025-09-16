import { Clock } from "lucide-react";
import { useEffect } from "react";
import { useTask } from "../../context/tasks/useTask";

import { Skeleton } from "../ui/skeleton";
import { AddTaskDialog } from "../dialogs/AddTaskDialog";
import { Task } from "./Task";

export const TaskList = () => {
  const { tasks, getTasks, loadingGet } = useTask();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Mis Tareas
          </h2>
          <p className="text-muted-foreground">
            Tienes {tasks.filter((task) => !task.completed).length} tareas
            pendientes
          </p>
        </div>

        <AddTaskDialog />
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loadingGet
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-10 w-20" />
              </div>
            ))
          : tasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                completed={task.completed}
              />
            ))}
      </section>
      {tasks.length === 0 && (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No hay tareas
          </h3>
          <p className="text-muted-foreground mb-4">
            Comienza agregando tu primera tarea
          </p>
        </div>
      )}
    </main>
  );
};
