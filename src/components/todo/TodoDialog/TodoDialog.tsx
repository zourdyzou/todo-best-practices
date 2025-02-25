import { useState, useEffect } from "react";
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


interface FormValues {
  todo: string;
  userId: string;
}

interface TodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { todo: string; userId: number }) => void;
  isLoading: boolean;
  mode: "create" | "edit";
  defaultValues?: FormValues;
}

export const TodoDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  mode,
  defaultValues = { todo: "", userId: "" },
}: TodoDialogProps) => {
  const [formState, setFormState] = useState<FormValues>({
    todo: defaultValues.todo,
    userId: defaultValues.userId,
  });

  useEffect(() => {
    if (mode === "edit") {
      setFormState({
        todo: defaultValues.todo,
        userId: defaultValues.userId,
      });
    }
  }, [defaultValues, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.userId) {
      toast.error("Please select a user");
      return;
    }

    if (!formState.todo?.trim()) {
      toast.error("Todo text cannot be empty");
      return;
    }

    onSubmit({
      todo: formState.todo.trim(),
      userId: parseInt(formState.userId),
    });

    setFormState({
      todo: "",
      userId: "",
    });
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
              value={formState.userId}
              onValueChange={(value) => setFormState(prev => ({ ...prev, userId: value }))}
              className="w-full"
              hideAllOption
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="todo">Todo</Label>
            <Input
              id="todo"
              value={formState.todo}
              onChange={(e) => setFormState(prev => ({ ...prev, todo: e.target.value }))}
              placeholder="Enter your todo..."
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
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
