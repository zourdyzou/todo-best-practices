// External imports
import { Trash2 } from "lucide-react";
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
import { TodoEdit } from "../TodoEdit/TodoEdit";

// Stores
import { useTodoStore } from "@/lib/stores/todo.store";

interface TodoItemProps {
  todo: TodoDTO;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { updateTodo: updateTodoInStore, deleteTodo: deleteTodoInStore } = useTodoStore();
  const { mutate: updateTodo, isLoading: isUpdating } = useUpdateTodo();
  const { mutate: deleteTodo, isLoading: isDeleting } = useDeleteTodo();

  const handleToggle = () => {
    updateTodo(
      { 
        id: todo.id, 
        todo: {
          todo: todo.todo,
          userId: todo.userId,
          completed: !todo.completed
        }
      },
      {
        onSuccess: (updatedTodo) => {
          updateTodoInStore(todo.id, updatedTodo);
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
        deleteTodoInStore(todo.id);
        toast.success("Todo deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete todo");
      },
    });
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
          <TodoEdit todo={todo} />
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
