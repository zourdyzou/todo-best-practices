import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../requests/get";

export const useTodos = (skip?: number, limit?: number) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["todos", skip, limit],
    queryFn: () => getTodos(skip, limit),
    staleTime: 1000 * 60 * 10, // Data considered fresh for 15 minutes
    gcTime: 1000 * 60 * 30, // Cache persists for 30 minutes before garbage collection
  });

  return { data, isLoading, isFetching, isError };
};
