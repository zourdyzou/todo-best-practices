import { useQuery } from "@tanstack/react-query";
import { getTodoById } from "../requests/get";

export const useTodoById = (id: number) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => getTodoById(id),
  });

  return { data, isLoading, isFetching, isError };
};
