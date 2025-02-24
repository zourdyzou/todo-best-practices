import { create } from 'zustand';
import { TodoDTO, TodosResponseDTO } from '../../api/requests/types/todo.types';

interface TodoState {
  todos: TodoDTO[];
  totalTodos: number;
  currentPage: number;
  itemsPerPage: number;
}

interface TodoActions {
  setTodos: (todosResponse: TodosResponseDTO) => void;
  addTodo: (todo: TodoDTO) => void;
  updateTodo: (id: number, updatedTodo: Partial<TodoDTO>) => void;
  deleteTodo: (id: number) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
}

export const useTodoStore = create<TodoState & TodoActions>((set) => ({
  // Initial State
  todos: [],
  totalTodos: 0,
  currentPage: 1,
  itemsPerPage: 10,

  // Actions
  setTodos: (todosResponse) => set({
    todos: todosResponse.todos,
    totalTodos: todosResponse.total,
  }),

  addTodo: (todo) => set((state) => ({
    todos: [...state.todos, todo],
    totalTodos: state.totalTodos + 1,
  })),

  updateTodo: (id, updatedTodo) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    ),
  })),

  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id),
    totalTodos: state.totalTodos - 1,
  })),

  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (items) => set({ itemsPerPage: items }),
}));