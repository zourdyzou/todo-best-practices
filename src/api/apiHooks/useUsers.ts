import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../requests/get";

export const useUsers = (skip?: number, limit?: number) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["users", skip, limit],
    queryFn: () => getUsers(skip, limit),
  });

  return { data, isLoading, isFetching, isError };
};