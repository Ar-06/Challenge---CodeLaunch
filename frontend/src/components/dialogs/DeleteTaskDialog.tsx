import { toast } from "@pheralb/toast";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useTask } from "../../context/tasks/useTask";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

interface DeleteTaskDialogProps {
  id: string;
}

export const DeleteDialogTask = ({ id }: DeleteTaskDialogProps) => {
  const { deleteTask, loadingDelete, errors } = useTask();

  const handleDelete = async () => {
    await deleteTask(id);
    if (!errors.length) {
      toast.success({ text: "Tarea eliminada correctamente 🎉" });
    }
  };

  useEffect(() => {
    if (errors.length) {
      errors.forEach((err) => toast.error({ text: err }));
    }
  }, [errors]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 cursor-pointer"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar tarea?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. La tarea será eliminada
            permanentemente de tu lista.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
            disabled={loadingDelete}
          >
            {loadingDelete ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
