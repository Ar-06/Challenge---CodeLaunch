import { toast } from "@pheralb/toast";
import confetti from "canvas-confetti";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import type { CreateTask } from "src/types/task.type";
import { useTask } from "../../context/tasks/useTask";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const AddTaskDialog = () => {
  const { createTask, loadingCreate, errors, clearErrors } = useTask();

  const [form, setForm] = useState<CreateTask>({
    title: "",
    description: "",
    completed: false,
  });

  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error({ text: "Faltan campos" });
    }
    await createTask(form);

    if (!errors.length) {
      setOpen(false);
      setForm({ title: "", description: "", completed: false });
      toast.success({ text: "Tarea agreada con éxito 🎉 " });
      confetti();
    }
  };

  useEffect(() => {
    if (errors.length) {
      errors.forEach((err) => toast.error({ text: err }));
    }
  }, [errors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((s) => ({ ...s, [id]: value }));
    if (errors.length) clearErrors();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-500 text-primary-foreground cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          Agregar Tarea
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Agregar Tarea</DialogTitle>
            <DialogDescription>
              Completa el formulario para añadir una nueva tarea a completar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Tarea #1"
                value={form.title ?? ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                placeholder="Repasar geometría desde la unidad uno."
                value={form.description ?? ""}
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
              disabled={loadingCreate}
            >
              {loadingCreate ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                </>
              ) : (
                "Agregar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
