"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { TodoDialog } from "@/components/todo/TodoDialog/TodoDialog";

interface TodoDialogContextProps {
  displayTodoDialog: (options: TodoDialogOptions) => void;
}

interface TodoDialogOptions {
  mode: "create" | "edit";
  defaultValues?: {
    todo: string;
    userId: string;
  };
  onSubmit: (data: { todo: string; userId: number }) => void;
  isLoading?: boolean;
}

const TodoDialogContext = createContext<TodoDialogContextProps>(
  {} as TodoDialogContextProps,
);

export const TodoDialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialogOptions, setDialogOptions] = useState<TodoDialogOptions | null>(
    null,
  );

  const displayTodoDialog = (options: TodoDialogOptions) => {
    setDialogOptions(options);
  };

  const handleClose = () => {
    setDialogOptions(null);
  };

  const handleSubmit = (data: { todo: string; userId: number }) => {
    try {
      dialogOptions?.onSubmit(data);
      handleClose();
    } catch (error) {
      // Keep dialog open if there's an error
      console.error("Error in dialog submission:", error);
    }
  };

  return (
    <TodoDialogContext.Provider value={{ displayTodoDialog }}>
      {children}
      {dialogOptions && (
        <TodoDialog
          open={!!dialogOptions}
          onOpenChange={handleClose}
          mode={dialogOptions.mode}
          onSubmit={handleSubmit}
          isLoading={dialogOptions.isLoading ?? false}
          defaultValues={
            dialogOptions.defaultValues && {
              todo: dialogOptions.defaultValues.todo,
              userId: dialogOptions.defaultValues.userId?.toString() ?? "",
            }
          }
        />
      )}
    </TodoDialogContext.Provider>
  );
};

export const useTodoDialog = () => {
  const context = useContext(TodoDialogContext);
  if (!context) {
    throw new Error("useTodoDialog must be used within a TodoDialogProvider");
  }
  return context.displayTodoDialog;
};
