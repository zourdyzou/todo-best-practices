import { useMutation } from "@tanstack/react-query";
import { deleteTodo } from "../requests/delete";

export const useDeleteTodo = () => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: (id: number) => deleteTodo(id),
  });

  return { mutate, isLoading: isPending, isError, isSuccess };
};
