import { useInfiniteQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/requests/get";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useUsers = (limit: number = 10) => {
  const query = useInfiniteQuery({
    queryKey: ["users", limit],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        return await getUsers(pageParam, limit);
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data?.message || error.message;
          toast.error(`Failed to fetch users: ${errorMessage}`);
        } else {
          toast.error("An unexpected error occurred while fetching users");
        }
        throw error;
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length * limit;
      return nextPage < lastPage.total ? nextPage : undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 10, // Data considered fresh for 15 minutes
    gcTime: 1000 * 60 * 30, // Cache persists for 30 minutes before garbage collection
  });

  const users = query.data?.pages.flatMap((page) => page.users) ?? [];
  const total = query.data?.pages[0]?.total ?? 0;

  return {
    users,
    total,
    ...query,
  };
};
