import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoSearch } from "./TodoSearch";
import { vi, describe, it, beforeEach, expect } from "vitest";

// Mock the hooks
const mockSetSearchQuery = vi.fn();

vi.mock("@/lib/stores/filter.store", () => ({
  useFilterStore: () => ({
    setSearchQuery: mockSetSearchQuery,
  }),
}));

describe("TodoSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input", () => {
    render(<TodoSearch />);

    expect(screen.getByPlaceholderText(/search todos/i)).toBeInTheDocument();
  });

  it("updates search query on input change", async () => {
    const user = userEvent.setup();
    render(<TodoSearch />);

    const searchInput = screen.getByPlaceholderText(/search todos/i);
    await user.type(searchInput, "test todo");

    expect(mockSetSearchQuery).toHaveBeenCalledWith("test todo");
  });

  it("debounces search input", async () => {
    vi.useFakeTimers();
    const user = userEvent.setup({ delay: null });
    render(<TodoSearch />);

    const searchInput = screen.getByPlaceholderText(/search todos/i);
    await user.type(searchInput, "test");

    expect(mockSetSearchQuery).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300); // Default debounce time
    expect(mockSetSearchQuery).toHaveBeenCalledWith("test");

    vi.useRealTimers();
  });

  it("clears search input when clicking clear button", async () => {
    const user = userEvent.setup();
    render(<TodoSearch />);

    const searchInput = screen.getByPlaceholderText(/search todos/i);
    await user.type(searchInput, "test todo");

    const clearButton = screen.getByRole("button", { name: /clear/i });
    await user.click(clearButton);

    expect(searchInput).toHaveValue("");
    expect(mockSetSearchQuery).toHaveBeenCalledWith("");
  });

  it("shows clear button only when input has value", async () => {
    const user = userEvent.setup();
    render(<TodoSearch />);

    expect(
      screen.queryByRole("button", { name: /clear/i }),
    ).not.toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/search todos/i);
    await user.type(searchInput, "test");

    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

  it("maintains input value after blur", async () => {
    const user = userEvent.setup();
    render(<TodoSearch />);

    const searchInput = screen.getByPlaceholderText(/search todos/i);
    await user.type(searchInput, "test todo");
    await user.tab(); // Move focus away from input

    expect(searchInput).toHaveValue("test todo");
  });
});
