import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoPagination } from "./TodoPagination";
import { vi, describe, it, expect } from "vitest";

// Mock the React's useMemo to return the calculated value directly
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useMemo: (fn: () => any) => fn(),
  };
});

// Mock the filter store
vi.mock("@/lib/stores/filter.store", () => ({
  useFilterStore: () => ({
    totalTodos: 25, // Default to 25 for most tests
  }),
}));

// Mock the todoStore since that's what the component actually uses
const mockSetCurrentPage = vi.fn();
vi.mock("@/lib/stores/todo.store", () => ({
  useTodoStore: () => ({
    currentPage: 1,
    setCurrentPage: mockSetCurrentPage,
    itemsPerPage: 10,
    totalTodos: 25,
  }),
}));

describe("TodoPagination", () => {
  it("renders pagination information correctly", () => {
    render(<TodoPagination />);

    expect(screen.getByText("Page")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("of")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument(); // 25/10 = 3 pages
  });

  it("navigates to next page when next button is clicked", async () => {
    const user = userEvent.setup();
    render(<TodoPagination />);

    const nextButton = screen.getByRole("button", { name: "Go to next page" });
    await user.click(nextButton);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it("disables previous button on first page", () => {
    render(<TodoPagination />);

    const prevButton = screen.getByRole("button", {
      name: "Go to previous page",
    });
    expect(prevButton).toBeDisabled();
  });

  it("renders with accessible buttons", () => {
    render(<TodoPagination />);

    const prevButton = screen.getByRole("button", {
      name: "Go to previous page",
    });
    const nextButton = screen.getByRole("button", { name: "Go to next page" });

    expect(prevButton).toHaveAttribute("aria-label", "Go to previous page");
    expect(nextButton).toHaveAttribute("aria-label", "Go to next page");
  });
});
