import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/requests/get";

export const useUsers = (skip: number = 0, limit: number = 10) => {
  const {
    data,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['users', skip],
    queryFn: () => getUsers(skip, limit),
  });

  return {
    data,
    isLoading,
    isFetching,
    hasMore: data ? data.users.length < data.total : false,
  };
};
