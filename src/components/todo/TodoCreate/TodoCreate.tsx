import { Plus } from "lucide-react";
import { toast } from "sonner";

// Types
import { TodoDTO } from "@/api/requests/types/todo.types";

// API hooks
import { useCreateTodo } from "@/api/apiHooks/useCreateTodo";

// Components
import { Button } from "@/components/ui/button";
import { TodoDialog } from "../TodoDialog/TodoDialog";

// Stores
import { useTodoStore } from "@/lib/stores/todo.store";
import { useUIStore } from "@/lib/stores/ui.store";

export const TodoCreate = () => {
  const { addTodo } = useTodoStore();
  const { isCreateModalOpen, setCreateModalOpen } = useUIStore();
  const { mutate: createTodo, isLoading } = useCreateTodo();

  const handleSubmit = (data: { todo: string; userId: number }) => {
    const newTodo: Omit<TodoDTO, "id"> = {
      todo: data.todo,
      completed: false,
      userId: data.userId,
    };

    createTodo(newTodo, {
      onSuccess: (createdTodo) => {
        addTodo(createdTodo);
        toast.success("Todo created successfully");
        setCreateModalOpen(false);
      },
      onError: () => {
        toast.error("Failed to create todo");
      },
    });
  };

  return (
    <>
      <Button onClick={() => setCreateModalOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Add Todo
      </Button>

      <TodoDialog
        open={isCreateModalOpen}
        onOpenChange={setCreateModalOpen}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        mode="create"
      />
    </>
  );
};
