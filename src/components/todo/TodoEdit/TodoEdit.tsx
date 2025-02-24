import { toast } from "sonner";
import { Pencil } from "lucide-react";

// Types
import { TodoDTO } from "@/api/requests/types/todo.types";

// API hooks
import { useUpdateTodo } from "@/api/apiHooks/useUpdateTodo";

// Components
import { Button } from "@/components/ui/button";
import { TodoDialog } from "../TodoDialog/TodoDialog";

// Stores
import { useTodoStore } from "@/lib/stores/todo.store";
import { useUIStore } from "@/lib/stores/ui.store";

interface TodoEditProps {
  todo: TodoDTO;
}

export const TodoEdit = ({ todo }: TodoEditProps) => {
  const { updateTodo } = useTodoStore();
  const { isEditModalOpen, setEditModalOpen, setSelectedTodoId } = useUIStore();
  const { mutate: editTodo, isLoading } = useUpdateTodo();

  const handleOpenEdit = () => {
    setSelectedTodoId(todo.id);
    setEditModalOpen(true);
  };

  const handleSubmit = (data: { todo: string; userId: number }) => {
    editTodo(
      {
        id: todo.id,
        todo: {
          todo: data.todo,
          userId: data.userId,
          completed: todo.completed
        }
      },
      {
        onSuccess: (updatedTodo) => {
          updateTodo(todo.id, updatedTodo);
          toast.success("Todo updated successfully");
          setEditModalOpen(false);
        },
        onError: () => {
          toast.error("Failed to update todo");
        },
      }
    );
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={handleOpenEdit}>
        <Pencil className="h-4 w-4" />
      </Button>

      <TodoDialog
        open={isEditModalOpen}
        onOpenChange={setEditModalOpen}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        mode="edit"
        defaultValues={{
          todo: todo.todo,
          userId: todo.userId,
        }}
      />
    </>
  );
};