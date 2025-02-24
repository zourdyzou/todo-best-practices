// External imports
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Types
import { TodoDTO } from "@/api/requests/types/todo.types";

// API hooks
import { useDeleteTodo } from "@/api/apiHooks/useDeleteTodo";
import { useUpdateTodo } from "@/api/apiHooks/useUpdateTodo";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";

// Stores
import { useTodoStore } from "@/lib/stores/todo.store";
import { useUIStore } from "@/lib/stores/ui.store";

interface TodoItemProps {
  todo: TodoDTO;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { setEditModalOpen, setSelectedTodoId } = useUIStore();
  const { updateTodo: updateTodoInStore } = useTodoStore();

  const { mutate: updateTodo, isLoading: isUpdating } = useUpdateTodo();
  const { mutate: deleteTodo, isLoading: isDeleting } = useDeleteTodo();

  const handleToggle = () => {
    updateTodo(
      { id: todo.id, todo: { completed: !todo.completed } },
      {
        onSuccess: () => {
          updateTodoInStore(todo.id, { completed: !todo.completed });
          toast.success("Todo status updated");
        },
        onError: () => {
          toast.error("Failed to update todo");
        },
      },
    );
  };

  const handleDelete = () => {
    deleteTodo(todo.id, {
      onSuccess: () => {
        toast.success("Todo deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete todo");
      },
    });
  };

  const handleEdit = () => {
    setSelectedTodoId(todo.id);
    setEditModalOpen(true);
  };

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggle}
            disabled={isUpdating}
          />
          <span className={todo.completed ? "line-through text-gray-500" : ""}>
            {todo.todo}
          </span>
          {isUpdating && <Spinner size="sm" className="ml-2" />}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleEdit}
            disabled={isUpdating || isDeleting}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting || isUpdating}
          >
            {isDeleting ? (
              <Spinner size="sm" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};