import { useState } from "react";
import { useTask } from "../../context/tasks/useTask";
import { DeleteDialogTask } from "../dialogs/DeleteTaskDialog";
import { UpdateTaskDialog } from "../dialogs/UpdateTaskDialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

interface TaskProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const Task = ({ id, title, description, completed }: TaskProps) => {
  const { toggleTask } = useTask();
  const [disabled, setDisabled] = useState(false);

  const handleToggle = (checked: boolean) => {
    toggleTask(id, checked);
    setDisabled(!disabled);
  };

  return (
    <Card
      key={id}
      className={`transition-all hover:shadow-md ${
        completed ? "opacity-75" : ""
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex space-x-2">
            <Checkbox
              checked={completed}
              className="mt-1"
              onCheckedChange={(checked) => handleToggle(!!checked)}
            />
            <CardTitle
              className={`text-lg ${
                completed
                  ? "line-through text-muted-foreground"
                  : "text-card-foreground"
              }`}
            >
              {title}
            </CardTitle>
          </div>
          <div className="flex space-x-2">
            <UpdateTaskDialog
              id={id}
              task={{ id, title, description, completed }}
              disabled={disabled}
            />
            <DeleteDialogTask id={id} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {description && (
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};
