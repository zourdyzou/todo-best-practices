import { vi } from "vitest";

// Todo Dialog Context
export const mockDisplayTodoDialog = vi.fn();

// API Hooks
export const mockCreateTodo = vi.fn();
export const mockUpdateTodo = vi.fn();

// Store Hooks
export const mockAddTodo = vi.fn();

// Mock implementations
vi.mock("../../../../src/context/TodoDialogContext", () => ({
  useTodoDialog: () => mockDisplayTodoDialog,
}));

vi.mock("../../../../src/api/apiHooks/useCreateTodo", () => ({
  useCreateTodo: () => ({
    mutate: mockCreateTodo,
    isPending: false,
  }),
}));

vi.mock("@/api/apiHooks/useUpdateTodo", () => ({
    useUpdateTodo: () => ({
      mutate: mockUpdateTodo,
      isPending: false,
    }),
}));

vi.mock("../../../../src/lib/stores/todo.store", () => ({
  useTodoStore: () => ({
    addTodo: mockAddTodo,
  }),
}));