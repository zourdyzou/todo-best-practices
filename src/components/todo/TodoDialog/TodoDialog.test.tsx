import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoDialog } from "./TodoDialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, it, beforeEach, expect } from "vitest";
import { toast } from "sonner";

// Mock UserSelectField component
vi.mock("@/components/user/UserSelectField/UserSelectField", () => ({
  UserSelectField: ({
    value,
    onValueChange,
  }: {
    value: string;
    onValueChange: (value: string) => void;
  }) => (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      data-testid="user-select"
    >
      <option value="">Select a user</option>
      <option value="1">User 1</option>
    </select>
  ),
}));

// Mock toast
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
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
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("TodoDialog", () => {
  const defaultProps = {
    open: true,
    onOpenChange: vi.fn(),
    onSubmit: vi.fn(),
    isLoading: false,
    mode: "create" as const,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders create dialog correctly", () => {
    render(<TodoDialog {...defaultProps} />, { wrapper });

    expect(screen.getByText("Create New Todo")).toBeInTheDocument();
    expect(screen.getByTestId("user-select")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your todo..."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Todo" }),
    ).toBeInTheDocument();
  });

  it("renders edit dialog correctly", () => {
    render(
      <TodoDialog
        {...defaultProps}
        mode="edit"
        defaultValues={{ todo: "Test Todo", userId: "1" }}
      />,
    );

    expect(screen.getByText("Edit Todo")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Todo")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Update Todo" }),
    ).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<TodoDialog {...defaultProps} isLoading={true} />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.getByText("Creating...")).toBeInTheDocument();
  });

  it("validates empty todo", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<TodoDialog {...defaultProps} onSubmit={onSubmit} />, { wrapper });

    // First select a user to get past the user validation
    await user.selectOptions(screen.getByTestId("user-select"), "1");

    await user.click(screen.getByRole("button", { name: "Create Todo" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Todo text cannot be empty");
  });

  it("validates user selection", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<TodoDialog {...defaultProps} onSubmit={onSubmit} />, { wrapper });

    await user.type(
      screen.getByPlaceholderText("Enter your todo..."),
      "Test Todo",
    );
    await user.click(screen.getByRole("button", { name: "Create Todo" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Please select a user");
  });

  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TodoDialog
        {...defaultProps}
        onSubmit={onSubmit}
        defaultValues={{ todo: "Test Todo", userId: "1" }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Create Todo" }));

    expect(onSubmit).toHaveBeenCalledWith({
      todo: "Test Todo",
      userId: 1,
    });
  });

  it("closes dialog when onOpenChange is called", async () => {
    const onOpenChange = vi.fn();
    render(<TodoDialog {...defaultProps} onOpenChange={onOpenChange} />);

    // Simulate dialog close
    const closeButton = screen.getByRole("button", { name: "Close" });
    await userEvent.click(closeButton);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("resets form on successful submission", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TodoDialog
        {...defaultProps}
        onSubmit={onSubmit}
        defaultValues={{ todo: "Test Todo", userId: "1" }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Create Todo" }));

    expect(onSubmit).toHaveBeenCalled();
    expect(screen.getByPlaceholderText("Enter your todo...")).toHaveValue("");
  });
});
