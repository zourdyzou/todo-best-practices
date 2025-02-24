import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../requests/get";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useTodos = (skip?: number, limit?: number) => {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["todos", skip, limit],
    queryFn: async () => {
      try {
        return await getTodos(skip, limit);
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data?.message || error.message;
          toast.error(`Failed to fetch todos: ${errorMessage}`);
        } else {
          toast.error("An unexpected error occurred while fetching todos");
        }
        throw error;
      }
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  return { data, isLoading, isFetching, isError, error };
};