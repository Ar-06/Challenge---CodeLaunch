import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTask } from "../../context/tasks/useTask";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

interface TaskProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const Task = ({ id, title, description, completed }: TaskProps) => {
  const { toggleTask, deleteTask } = useTask();
  const [disabled, setDisabled] = useState(false);

  const handleToggle = (checked: boolean) => {
    toggleTask(id, checked);
    setDisabled(!disabled);
  };

  const handleDelete = () => {
    deleteTask(id);
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
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 cursor-pointer"
              disabled={disabled ? true : false}
            >
              <Pencil className="h-4 w-4 text-blue-500" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 cursor-pointer"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
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
