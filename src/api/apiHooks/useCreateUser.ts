import { useMutation } from "@tanstack/react-query";
import { createUser } from "../requests/post";
import { UserDTO } from "../requests/types/user.types";

export const useCreateUser = () => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: (user: Omit<UserDTO, "id">) => createUser(user),
  });

  return { mutate, isLoading: isPending, isError, isSuccess };
};