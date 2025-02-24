import { api } from "../axios";
import { TodoDTO } from "./types/todo.types";
import { UserDTO } from "./types/user.types";

// Delete a todo
export const deleteTodo = async (id: number) =>
  (await api.delete<TodoDTO>(`/todos/${id}`)).data;

// Delete a user
export const deleteUser = async (id: number) =>
  (await api.delete<UserDTO>(`/users/${id}`)).data;
