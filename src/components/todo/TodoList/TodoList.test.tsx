import { render, screen } from "@testing-library/react";
import { TodoList } from "./TodoList";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock API hook
vi.mock("@/api/apiHooks/useTodos", () => ({
  useTodos: vi.fn(),
}));

// Mock stores
vi.mock("@/lib/stores/todo.store", () => ({
  useTodoStore: vi.fn(),
}));

vi.mock("@/lib/stores/filter.store", () => ({
  useFilterStore: vi.fn(),
}));

// Mock components
vi.mock("../TodoItem/TodoItem", () => ({
  TodoItem: ({ todo }: any) => (
    <div data-testid={`todo-item-${todo.id}`}>{todo.todo}</div>
  ),
}));

// Mock data
const mockTodos = [
  { id: 1, todo: "Learn React", userId: 1, completed: false },
  { id: 2, todo: "Build a todo app", userId: 1, completed: true },
  { id: 3, todo: "Test components", userId: 2, completed: false },
];

// Import the mocked functions
import { useTodos } from "@/api/apiHooks/useTodos";
import { useTodoStore } from "@/lib/stores/todo.store";
import { useFilterStore } from "@/lib/stores/filter.store";

// Setup wrapper
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const testQueryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("TodoList", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementations
    vi.mocked(useTodoStore).mockReturnValue({
      todos: mockTodos,
      setTodos: vi.fn(),
      currentPage: 1,
      itemsPerPage: 10,
    });

    vi.mocked(useFilterStore).mockReturnValue({
      searchQuery: "",
      selectedUserId: null,
    });

    vi.mocked(useTodos).mockReturnValue({
      data: {
        todos: mockTodos,
        total: mockTodos.length,
        skip: 0,
        limit: 10,
      },
      isFetching: false,
      isLoading: false,
      isError: false,
      error: null,
    });
  });

  it("displays loading state when fetching todos", () => {
    vi.mocked(useTodos).mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: true,
      isError: false,
      error: null,
    });

    render(<TodoList />, { wrapper });

    expect(screen.getByText("Loading todos...")).toBeInTheDocument();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("displays error state when fetching fails", () => {
    vi.mocked(useTodos).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      isError: true,
      error: new Error("Network error"),
    });

    render(<TodoList />, { wrapper });

    expect(screen.getByText("Failed to fetch todos")).toBeInTheDocument();
    expect(screen.getByText("Network error")).toBeInTheDocument();
  });

  it("displays empty state when no todos match filters", () => {
    vi.mocked(useFilterStore).mockReturnValue({
      searchQuery: "nonexistent todo",
      selectedUserId: null,
    });

    render(<TodoList />, { wrapper });

    expect(screen.getByText("No todos found")).toBeInTheDocument();
  });

  it("renders todos successfully", () => {
    render(<TodoList />, { wrapper });

    expect(screen.getByTestId("todo-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("todo-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("todo-item-3")).toBeInTheDocument();
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a todo app")).toBeInTheDocument();
    expect(screen.getByText("Test components")).toBeInTheDocument();
  });

  it("filters todos by search query", () => {
    vi.mocked(useFilterStore).mockReturnValue({
      searchQuery: "react",
      selectedUserId: null,
    });

    render(<TodoList />, { wrapper });

    expect(screen.getByTestId("todo-item-1")).toBeInTheDocument();
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.queryByText("Build a todo app")).not.toBeInTheDocument();
    expect(screen.queryByText("Test components")).not.toBeInTheDocument();
  });

  it("filters todos by user ID", () => {
    vi.mocked(useFilterStore).mockReturnValue({
      searchQuery: "",
      selectedUserId: 2,
    });

    render(<TodoList />, { wrapper });

    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
    expect(screen.queryByText("Build a todo app")).not.toBeInTheDocument();
    expect(screen.getByTestId("todo-item-3")).toBeInTheDocument();
    expect(screen.getByText("Test components")).toBeInTheDocument();
  });

  it("combines filters (search query AND user ID)", () => {
    vi.mocked(useFilterStore).mockReturnValue({
      searchQuery: "app",
      selectedUserId: 1,
    });

    render(<TodoList />, { wrapper });

    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
    expect(screen.getByTestId("todo-item-2")).toBeInTheDocument();
    expect(screen.getByText("Build a todo app")).toBeInTheDocument();
    expect(screen.queryByText("Test components")).not.toBeInTheDocument();
  });

  it("updates todos when data changes", () => {
    const setTodos = vi.fn();
    vi.mocked(useTodoStore).mockReturnValue({
      todos: [],
      setTodos,
      currentPage: 1,
      itemsPerPage: 10,
    });

    render(<TodoList />, { wrapper });

    expect(setTodos).toHaveBeenCalledWith({
      todos: mockTodos,
      total: mockTodos.length,
      skip: 0,
      limit: 10,
    });
  });

  it("requests todos with correct pagination parameters", () => {
    vi.mocked(useTodoStore).mockReturnValue({
      todos: mockTodos,
      setTodos: vi.fn(),
      currentPage: 2,
      itemsPerPage: 5,
    });

    render(<TodoList />, { wrapper });

    expect(useTodos).toHaveBeenCalledWith(5, 5);
  });
});
