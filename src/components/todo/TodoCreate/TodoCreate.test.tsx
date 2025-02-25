import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoCreate } from "./TodoCreate";
import {
  mockDisplayTodoDialog,
  mockCreateTodo,
  mockAddTodo,
} from "../../../../__mocks__/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, it, beforeEach, expect } from "vitest";

// Mock the hooks directly in the test file
vi.mock("@/context/TodoDialogContext", () => ({
  useTodoDialog: () => mockDisplayTodoDialog,
}));

vi.mock("@/api/apiHooks/useCreateTodo", () => ({
  useCreateTodo: () => ({
    mutate: mockCreateTodo,
    isPending: false,
  }),
}));

vi.mock("@/lib/stores/todo.store", () => ({
  useTodoStore: () => ({
    addTodo: mockAddTodo,
  }),
}));

// Create a new QueryClient for each test
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Simplified wrapper without TodoDialogProvider
const wrapper = ({ children }: { children: React.ReactNode }) => {
  const testQueryClient = createTestQueryClient();
  return <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>;
};

describe("TodoCreate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders create button", () => {
    render(<TodoCreate />, { wrapper });
    expect(screen.getByRole("button", { name: /add todo/i })).toBeInTheDocument();
  });

  it("opens todo dialog when clicked", async () => {
    const user = userEvent.setup();
    render(<TodoCreate />, { wrapper });

    await user.click(screen.getByRole("button", { name: /add todo/i }));

    expect(mockDisplayTodoDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "create",
        onSubmit: expect.any(Function),
      })
    );
  });

  it("handles todo creation success", async () => {
    const user = userEvent.setup();
    render(<TodoCreate />, { wrapper });
    
    await user.click(screen.getByRole("button", { name: /add todo/i }));
    
    const onSubmit = mockDisplayTodoDialog.mock.calls[0][0].onSubmit;
    mockCreateTodo.mockImplementation((todo, options) => {
      options.onSuccess({
        id: 1,
        ...todo,
      });
    });

    await onSubmit({
      todo: "Test Todo",
      userId: 1,
    });

    expect(mockCreateTodo).toHaveBeenCalledWith(
      {
        todo: "Test Todo",
        userId: 1,
        completed: false,
      },
      expect.any(Object)
    );

    expect(mockAddTodo).toHaveBeenCalledWith({
      id: 1,
      todo: "Test Todo",
      userId: 1,
      completed: false,
    });
  });

  it("handles todo creation error", async () => {
    const user = userEvent.setup();
    render(<TodoCreate />, { wrapper });
    
    await user.click(screen.getByRole("button", { name: /add todo/i }));
    
    const onSubmit = mockDisplayTodoDialog.mock.calls[0][0].onSubmit;
    mockCreateTodo.mockImplementation((todo, options) => {
      options.onError(new Error("Failed to create todo"));
    });

    try {
      await onSubmit({
        todo: "Test Todo",
        userId: 1,
      });
    } catch (error) {
      expect(error).toBeDefined();
    }

    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  it("shows loading state", async () => {
    vi.mock("@/api/apiHooks/useCreateTodo", () => ({
      useCreateTodo: () => ({
        mutate: mockCreateTodo,
        isPending: true,
      }),
    }));

    const user = userEvent.setup();
    render(<TodoCreate />, { wrapper });
    
    await user.click(screen.getByRole("button", { name: /add todo/i }));

    expect(mockDisplayTodoDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "create",
        onSubmit: expect.any(Function),
      })
    );
  });
});
