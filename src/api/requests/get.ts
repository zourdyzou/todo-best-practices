import { api } from "../axios";
import { TodoDTO, TodosResponseDTO } from "./types/todo.types";
import { UserDTO, UsersResponseDTO } from "./types/user.types";

// Get all todos with pagination
export const getTodos = async (skip: number = 0, limit: number = 10) =>
  (await api.get<TodosResponseDTO>(`/todos?skip=${skip}&limit=${limit}`)).data;

// Get a single todo by ID
export const getTodoById = async (id: number) =>
  (await api.get<TodoDTO>(`/todos/${id}`)).data;

// Get all users with pagination
export const getUsers = async (skip: number = 0, limit: number = 10) =>
  (await api.get<UsersResponseDTO>(`/users?skip=${skip}&limit=${limit}`)).data;

// Get a single user by ID
export const getUserById = async (id: number) =>
  (await api.get<UserDTO>(`/users/${id}`)).data;