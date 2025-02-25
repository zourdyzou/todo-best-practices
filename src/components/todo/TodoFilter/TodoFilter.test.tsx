import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoFilter } from "./TodoFilter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, it, beforeEach, expect } from "vitest";

// Mock the hooks and components
vi.mock("@/lib/stores/filter.store", () => ({
  useFilterStore: () => ({
    setSelectedUserId: mockSetSelectedUserId,
  }),
}));

vi.mock("@/components/user/UserSelectField/UserSelectField", () => ({
  UserSelectField: ({ value, onValueChange }: any) => (
    <select
      data-testid="user-select"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    >
      <option value="">Select user</option>
      <option value="all">All Users</option>
      <option value="1">User 1</option>
    </select>
  ),
}));

vi.mock("../TodoSearch/TodoSearch", () => ({
  TodoSearch: () => <div data-testid="todo-search">Search Component</div>,
}));

const mockSetSelectedUserId = vi.fn();

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

describe("TodoFilter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search and user select components", () => {
    render(<TodoFilter />, { wrapper });
    
    expect(screen.getByTestId("todo-search")).toBeInTheDocument();
    expect(screen.getByTestId("user-select")).toBeInTheDocument();
  });

  it("handles user selection change", async () => {
    const user = userEvent.setup();
    render(<TodoFilter />, { wrapper });
    
    const select = screen.getByTestId("user-select");
    
    // Select specific user
    await user.selectOptions(select, "1");
    expect(mockSetSelectedUserId).toHaveBeenCalledWith(1);
    
    // Select all users
    await user.selectOptions(select, "all");
    expect(mockSetSelectedUserId).toHaveBeenCalledWith(null);
  });

  it("maintains local state for user selection", async () => {
    const user = userEvent.setup();
    render(<TodoFilter />, { wrapper });
    
    const select = screen.getByTestId("user-select");
    
    await user.selectOptions(select, "1");
    expect(select).toHaveValue("1");
    
    await user.selectOptions(select, "all");
    expect(select).toHaveValue("all");
  });

  it("applies responsive styling", () => {
    render(<TodoFilter />, { wrapper });
    
    const container = screen.getByTestId("todo-search").parentElement?.parentElement;
    expect(container).toHaveClass("flex flex-col sm:flex-row gap-4");
  });
});
