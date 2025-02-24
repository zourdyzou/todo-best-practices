import { api } from "../axios";
import { TodosResponseDTO } from "./types/todo.types";
import { UsersResponseDTO } from "./types/user.types";

// Get all todos with pagination
export const getTodos = async (skip: number = 0, limit: number = 10) =>
  (await api.get<TodosResponseDTO>(`/todos?skip=${skip}&limit=${limit}`)).data;

// Get all users with pagination
export const getUsers = async (skip: number = 0, limit: number = 10) =>
  (await api.get<UsersResponseDTO>(`/users?skip=${skip}&limit=${limit}`)).data;

