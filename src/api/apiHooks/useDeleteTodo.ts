import { useMutation } from "@tanstack/react-query";
import { deleteTodo } from "../requests/delete";
import { useTodoStore } from "@/lib/stores/todo.store";

export const useDeleteTodo = () => {
  const isLocalTodo = useTodoStore((state) => state.isLocalTodo);

  return useMutation({
    mutationFn: async (id: number) => {
      // If it's a local todo, just return success
      if (isLocalTodo(id)) {
        return true;
      }
      // Otherwise, try the real API
      return deleteTodo(id);
    }
  });
};
