import { toast } from "@pheralb/toast";
import {
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Loader2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useTask } from "../../context/tasks/useTask";
import type { CreateTask, TaskPublic } from "../../types/task.type";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface UpdateTaskDialogProps {
  id: string;
  task: TaskPublic;
  disabled: boolean;
}

export const UpdateTaskDialog = ({
  id,
  task,
  disabled,
}: UpdateTaskDialogProps) => {
  const { updateTask, loadingUpdate, errors, clearErrors } = useTask();

  const [form, setForm] = useState<CreateTask>({
    title: task.title,
    description: task.description,
    completed: task.completed,
  });

  const [open, setOpen] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTask(id, form);
    if (!errors.length) {
      toast.success({ text: "Tarea actualizada correctamente 🎉" });
      setOpen(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((s) => ({ ...s, [id]: value }));
    if (errors.length) clearErrors();
  };

  useEffect(() => {
    if (errors.length) {
      errors.forEach((err) => toast.error({ text: err }));
    }
  }, [errors]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 cursor-pointer"
          disabled={disabled ? true : false}
        >
          <Pencil className="h-4 w-4 text-blue-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleUpdate} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Editar Tarea</DialogTitle>
            <DialogDescription>
              Actualiza los datos de tu tarea.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                className="font-medium bg-red-600 hover:bg-red-700 transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:shadow-lg cursor-pointer"
              disabled={loadingUpdate}
            >
              {loadingUpdate ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                </>
              ) : (
                "Actualizar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
