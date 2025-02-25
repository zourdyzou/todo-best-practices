import { Plus } from "lucide-react";
import { toast } from "sonner";

// Types
import { TodoDTO } from "@/api/requests/types/todo.types";

// API hooks
import { useCreateTodo } from "@/api/apiHooks/useCreateTodo";

// Components
import { Button } from "@/components/ui/button";
import { useTodoDialog } from "@/context/TodoDialogContext";

// Stores
import { useTodoStore } from "@/lib/stores/todo.store";

export const TodoCreate = () => {
  const { addTodo } = useTodoStore();
  const displayTodoDialog = useTodoDialog();
  const { mutate: createTodo, isLoading } = useCreateTodo();

  const handleCreate = () => {
    displayTodoDialog({
      mode: "create",
      isLoading,
      onSubmit: (data) => {
        const newTodo: Omit<TodoDTO, "id"> = {
          todo: data.todo,
          completed: false,
          userId: data.userId,
        };

        createTodo(newTodo, {
          onSuccess: (createdTodo) => {
            addTodo(createdTodo);
            toast.success("Todo created successfully");
          },
          onError: () => {
            toast.error("Failed to create todo");
          },
        });
      },
    });
  };

  return (
    <Button onClick={handleCreate}>
      <Plus className="h-4 w-4 mr-2" />
      Add Todo
    </Button>
  );
};
