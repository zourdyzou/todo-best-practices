import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../requests/put";
import { UserDTO } from "../requests/types/user.types";

export const useUpdateUser = () => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: ({ id, user }: { id: number; user: Partial<UserDTO> }) => 
      updateUser(id, user),
  });

  return { mutate, isLoading: isPending, isError, isSuccess };
};