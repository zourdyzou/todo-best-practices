import { create } from "zustand";
import { TodoDTO, TodosResponseDTO } from "../../api/requests/types/todo.types";

interface TodoState {
  todos: TodoDTO[];
  totalTodos: number;
  currentPage: number;
  itemsPerPage: number;
  localTodoIds: Set<number>;
}

interface TodoActions {
  setTodos: (todosResponse: TodosResponseDTO) => void;
  addTodo: (todo: TodoDTO) => void;
  updateTodo: (id: number, updatedTodo: Partial<TodoDTO>) => void;
  deleteTodo: (id: number) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  isLocalTodo: (id: number) => boolean;
}

export const useTodoStore = create<TodoState & TodoActions>((set, get) => ({
  // Initial State
  todos: [],
  totalTodos: 0,
  currentPage: 1,
  itemsPerPage: 10,
  localTodoIds: new Set<number>(),

  // Actions
  setTodos: (todosResponse) =>
    set({
      todos: todosResponse.todos,
      totalTodos: todosResponse.total,
    }),

  addTodo: (todo) =>
    set((state) => {
      state.localTodoIds.add(todo.id);
      return {
        todos: [todo, ...state.todos],
        totalTodos: state.totalTodos + 1,
        localTodoIds: state.localTodoIds,
      };
    }),

  updateTodo: (id, updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo,
      ),
    })),

  deleteTodo: (id) =>
    set((state) => {
      state.localTodoIds.delete(id);
      return {
        todos: state.todos.filter((todo) => todo.id !== id),
        totalTodos: state.totalTodos - 1,
        localTodoIds: state.localTodoIds,
      };
    }),

  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (items) => set({ itemsPerPage: items }),

  isLocalTodo: (id) => get().localTodoIds.has(id),
}));
