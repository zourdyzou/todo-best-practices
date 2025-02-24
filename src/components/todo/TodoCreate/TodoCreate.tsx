// External imports
import { Plus } from "lucide-react";
import { toast } from "sonner";

// Types
import { TodoDTO } from "@/api/requests/types/todo.types";

// API hooks
import { useCreateTodo } from "@/api/apiHooks/useCreateTodo";

// Components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

// Stores
import { useUserStore } from "@/lib/stores/user.store";
import { useState } from "react";

export const TodoCreate = () => {
  const [open, setOpen] = useState(false);
  const [todoText, setTodoText] = useState("");
  const { selectedUser } = useUserStore();
  const { mutate: createTodo, isLoading } = useCreateTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser) {
      toast.error("Please select a user first");
      return;
    }

    if (!todoText.trim()) {
      toast.error("Todo text cannot be empty");
      return;
    }

    const newTodo: Omit<TodoDTO, "id"> = {
      todo: todoText.trim(),
      completed: false,
      userId: selectedUser.id,
    };

    createTodo(newTodo, {
      onSuccess: () => {
        toast.success("Todo created successfully");
        setTodoText("");
        setOpen(false);
      },
      onError: () => {
        toast.error("Failed to create todo");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Todo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="todo">Todo</Label>
            <Input
              id="todo"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              placeholder="Enter your todo..."
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading || !selectedUser}>
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Creating...
              </>
            ) : (
              'Create Todo'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};