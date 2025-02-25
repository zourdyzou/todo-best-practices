import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { UserSelectField } from "./UserSelectField";
import { useUsers } from "@/api/apiHooks/useUsers";
import { UserDTO } from "@/api/requests/types/user.types";

// Mock the API hook
vi.mock("@/api/apiHooks/useUsers");

// Mock intersection observer
vi.mock("react-intersection-observer", () => ({
  useInView: () => ({ ref: null, inView: false }),
}));

// Mock Radix UI Select
vi.mock("@/components/ui/select", () => ({
  Select: ({ children, onValueChange }: any) => (
    <div data-testid="mock-select">
      <button onClick={() => onValueChange("1")}>Select</button>
      {children}
    </div>
  ),
  SelectContent: ({ children }: any) => <div>{children}</div>,
  SelectItem: ({ children, value }: any) => (
    <div data-testid={`select-item-${value}`}>{children}</div>
  ),
  SelectTrigger: ({ children }: any) => <div role="combobox">{children}</div>,
  SelectValue: ({ placeholder }: any) => <span>{placeholder}</span>,
}));

const mockUsers: UserDTO[] = [
  { id: 1, firstName: "John", lastName: "Doe", age: 30 },
  { id: 2, firstName: "Jane", lastName: "Smith", age: 25 },
];

describe("UserSelectField", () => {
  const mockOnValueChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading state", () => {
    vi.mocked(useUsers).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: vi.fn(),
    } as any);

    render(<UserSelectField onValueChange={mockOnValueChange} />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("renders error state", () => {
    vi.mocked(useUsers).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: vi.fn(),
    } as any);

    render(<UserSelectField onValueChange={mockOnValueChange} />);
    expect(screen.getByTestId("error-title")).toBeInTheDocument();
  });

  test("renders users and allows selection", async () => {
    vi.mocked(useUsers).mockReturnValue({
      data: {
        pages: [{ users: mockUsers, total: mockUsers.length, skip: 0, limit: 10 }],
        pageParams: [0]
      },
      isLoading: false,
      isError: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: vi.fn(),
    } as any);

    const user = userEvent.setup();
    render(<UserSelectField onValueChange={mockOnValueChange} />);

    await user.click(screen.getByText("Select"));
    expect(mockOnValueChange).toHaveBeenCalledWith("1");
  });

  test("hides 'All Users' option when hideAllOption is true", () => {
    vi.mocked(useUsers).mockReturnValue({
      data: {
        pages: [{ users: mockUsers, total: mockUsers.length, skip: 0, limit: 10 }],
        pageParams: [0]
      },
      isLoading: false,
      isError: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: vi.fn(),
    } as any);

    render(<UserSelectField onValueChange={mockOnValueChange} hideAllOption />);
    expect(screen.queryByText("All Users")).not.toBeInTheDocument();
  });

  test("shows infinite scroll loader when hasNextPage is true", () => {
    vi.mocked(useUsers).mockReturnValue({
      data: {
        pages: [{ users: mockUsers, total: mockUsers.length, skip: 0, limit: 10 }],
        pageParams: [0]
      },
      isLoading: false,
      isError: false,
      isFetchingNextPage: false,
      hasNextPage: true,
      fetchNextPage: vi.fn(),
    } as any);

    render(<UserSelectField onValueChange={mockOnValueChange} />);
    expect(screen.getByText("Scroll for more...")).toBeInTheDocument();
  });
});