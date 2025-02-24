import { useState } from "react";
import { toast } from "sonner";

// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { UserSelectField } from "@/components/user/UserSelectField/UserSelectField";

interface TodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { todo: string; userId: number }) => void;
  isLoading: boolean;
  mode: "create" | "edit";
  defaultValues?: {
    todo?: string;
    userId?: number;
  };
}

export const TodoDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  mode,
  defaultValues = {},
}: TodoDialogProps) => {
  const [todoText, setTodoText] = useState(defaultValues.todo ?? "");
  const [selectedUserId, setSelectedUserId] = useState<string>(
    defaultValues.userId?.toString() ?? "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserId) {
      toast.error("Please select a user");
      return;
    }

    if (!todoText.trim()) {
      toast.error("Todo text cannot be empty");
      return;
    }

    onSubmit({
      todo: todoText.trim(),
      userId: parseInt(selectedUserId),
    });

    setTodoText("");
    setSelectedUserId("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Todo" : "Edit Todo"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user">Assign To</Label>
            <UserSelectField
              value={selectedUserId}
              onValueChange={setSelectedUserId}
              className="w-full"
              hideAllOption
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="todo">Todo</Label>
            <Input
              id="todo"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              placeholder="Enter your todo..."
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !selectedUserId}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                {mode === "create" ? "Creating..." : "Updating..."}
              </>
            ) : mode === "create" ? (
              "Create Todo"
            ) : (
              "Update Todo"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
