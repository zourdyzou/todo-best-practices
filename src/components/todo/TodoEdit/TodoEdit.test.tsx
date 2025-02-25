import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoEdit } from "./TodoEdit";
import { mockDisplayTodoDialog, mockUpdateTodo, mockAddTodo } from "../../../../__mocks__/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, it, beforeEach, expect } from "vitest";

// Mock the hooks
vi.mock("@/context/TodoDialogContext", () => ({
  useTodoDialog: () => mockDisplayTodoDialog,
}));

vi.mock("@/api/apiHooks/useUpdateTodo", () => ({
  useUpdateTodo: () => ({
    mutate: mockUpdateTodo,
    isPending: false,
  }),
}));

vi.mock("@/lib/stores/todo.store", () => ({
  useTodoStore: () => ({
    updateTodo: mockAddTodo,
  }),
}));

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
  return <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>;
};

describe("TodoEdit", () => {
  const mockTodo = {
    id: 1,
    todo: "Test Todo",
    userId: 1,
    completed: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders edit button", () => {
    render(<TodoEdit todo={mockTodo} />, { wrapper });
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("opens todo dialog when clicked", async () => {
    const user = userEvent.setup();
    render(<TodoEdit todo={mockTodo} />, { wrapper });

    await user.click(screen.getByRole("button"));

    expect(mockDisplayTodoDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "edit",
        defaultValues: {
          todo: "Test Todo",
          userId: "1",
        },
        onSubmit: expect.any(Function),
      })
    );
  });

  it("handles todo update success", async () => {
    const user = userEvent.setup();
    render(<TodoEdit todo={mockTodo} />, { wrapper });

    await user.click(screen.getByRole("button"));
    
    const dialogCall = mockDisplayTodoDialog.mock.calls[0][0];
    mockUpdateTodo.mockImplementation((_, options) => {
      options.onSuccess({
        ...mockTodo,
        todo: "Updated Todo",
        userId: 2,
      });
    });

    await dialogCall.onSubmit({
      todo: "Updated Todo",
      userId: 2,
    });

    expect(mockUpdateTodo).toHaveBeenCalledWith(
      {
        id: 1,
        todo: {
          todo: "Updated Todo",
          userId: 2,
          completed: false,
        },
      },
      expect.any(Object)
    );

    expect(mockAddTodo).toHaveBeenCalledWith(
      1,
      {
        id: 1,
        todo: "Updated Todo",
        userId: 2,
        completed: false,
      }
    );
  });

  it("handles todo update error", async () => {
    const user = userEvent.setup();
    render(<TodoEdit todo={mockTodo} />, { wrapper });

    await user.click(screen.getByRole("button"));
    
    const dialogCall = mockDisplayTodoDialog.mock.calls[0][0];
    mockUpdateTodo.mockImplementation((_, options) => {
      options.onError(new Error("Failed to update todo"));
    });

    try {
      await dialogCall.onSubmit({
        todo: "Updated Todo",
        userId: 2,
      });
    } catch (error) {
      expect(error).toBeDefined();
    }

    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  it("shows loading state", async () => {
    vi.mock("@/api/apiHooks/useUpdateTodo", () => ({
      useUpdateTodo: () => ({
        mutate: mockUpdateTodo,
        isPending: true,
      }),
    }));

    const user = userEvent.setup();
    render(<TodoEdit todo={mockTodo} />, { wrapper });
    
    await user.click(screen.getByRole("button"));

    expect(mockDisplayTodoDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "edit",
        isLoading: true,
        onSubmit: expect.any(Function),
      })
    );
  });
});
