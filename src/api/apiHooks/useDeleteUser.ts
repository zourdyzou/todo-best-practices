import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../requests/delete";

export const useDeleteUser = () => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (id: number) => deleteUser(id),
  });

  return { mutate, isLoading: isPending, isError, isSuccess };
};
