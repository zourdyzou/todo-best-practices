import { api } from "../axios";
import { TodoDTO } from "./types/todo.types";
import { UserDTO } from "./types/user.types";

// Create a new todo
export const createTodo = async (todo: Omit<TodoDTO, "id">) =>
  (await api.post<TodoDTO>("/todos/add", todo)).data;

// Create a new user
export const createUser = async (user: Omit<UserDTO, "id">) =>
  (await api.post<UserDTO>("/users/add", user)).data;
