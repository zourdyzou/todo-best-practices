import { useMutation } from "@tanstack/react-query";
import { updateTodo } from "../requests/put";
import { TodoDTO } from "../requests/types/todo.types";

export const useUpdateTodo = () => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: ({ id, todo }: { id: number; todo: Partial<TodoDTO> }) =>
      updateTodo(id, todo),
  });

  return { mutate, isLoading: isPending, isError, isSuccess };
};
