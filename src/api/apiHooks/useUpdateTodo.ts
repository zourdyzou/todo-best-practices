import { useMutation } from "@tanstack/react-query";
import { updateTodo } from "../requests/put";
import { TodoDTO } from "../requests/types/todo.types";
import { useTodoStore } from "@/lib/stores/todo.store";

export const useUpdateTodo = () => {
  const isLocalTodo = useTodoStore((state) => state.isLocalTodo);

  return useMutation({
    mutationFn: async (params: { id: number; todo: Partial<TodoDTO> }) => {
      const { id, todo } = params;
      // If it's a local todo, simulate API response
      if (isLocalTodo(id)) {
        return { ...todo, id } as TodoDTO;
      }
      // Otherwise, try the real API
      return updateTodo(id, todo);
    },
  });
};
