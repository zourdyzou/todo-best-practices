import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../requests/get";

export const useUserById = (id: number) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });

  return { data, isLoading, isFetching, isError };
};
