import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTodoDialog } from "@/context/TodoDialogContext";
import { useUpdateTodo } from "@/api/apiHooks/useUpdateTodo";
import { useTodoStore } from "@/lib/stores/todo.store";
import { TodoDTO } from "@/api/requests/types/todo.types";

interface TodoEditProps {
  todo: TodoDTO;
}

export const TodoEdit = ({ todo }: TodoEditProps) => {
  const { updateTodo } = useTodoStore();
  const displayTodoDialog = useTodoDialog();
  const { mutate: editTodo, isPending: isLoading } = useUpdateTodo();

  const handleEdit = () => {
    displayTodoDialog({
      mode: "edit",
      defaultValues: {
        todo: todo.todo,
        userId: todo.userId.toString(),
      },
      isLoading,
      onSubmit: (data: { todo: string; userId: number }) => {
        editTodo(
          {
            id: todo.id,
            todo: {
              todo: data.todo,
              userId: data.userId,
              completed: todo.completed,
            },
          },
          {
            onSuccess: (updatedTodo) => {
              updateTodo(todo.id, updatedTodo);
              toast.success("Todo updated successfully");
            },
            onError: () => {
              toast.error("Failed to update todo");
            },
          },
        );
      },
    });
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleEdit}>
      <Pencil className="h-4 w-4" />
    </Button>
  );
};
