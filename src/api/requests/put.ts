import { api } from "../axios";
import { TodoDTO } from "./types/todo.types";
import { UserDTO } from "./types/user.types";

// Update a todo
export const updateTodo = async (id: number, todo: Partial<TodoDTO>) =>
  (await api.put<TodoDTO>(`/todos/${id}`, todo)).data;

// Update a user
export const updateUser = async (id: number, user: Partial<UserDTO>) =>
  (await api.put<UserDTO>(`/users/${id}`, user)).data;
