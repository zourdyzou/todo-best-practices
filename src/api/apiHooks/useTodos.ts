import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../requests/get";

export const useTodos = (skip?: number, limit?: number) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["todos", skip, limit],
    queryFn: () => getTodos(skip, limit),
  });

  return { data, isLoading, isFetching, isError };
};