import { useMutation } from "@tanstack/react-query";
import { createTodo } from "../requests/post";
import { TodoDTO } from "../requests/types/todo.types";

export const useCreateTodo = () => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: (todo: Omit<TodoDTO, "id">) => createTodo(todo),
  });

  return { mutate, isLoading: isPending, isError, isSuccess };
};
