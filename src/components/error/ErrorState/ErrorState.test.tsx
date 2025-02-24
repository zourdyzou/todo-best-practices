import { render, screen } from "@/test/utils";
import { describe, it, expect } from "vitest";
import { ErrorState } from "./ErrorState";

describe("DataLoadError", () => {
  it("renders with default props", () => {
    render(<ErrorState />);
    
    expect(screen.getByText("Failed to load data")).toBeInTheDocument();
    expect(
      screen.getByText("There was a problem loading the data. Please try refreshing the page or try again later.")
    ).toBeInTheDocument();
  });

  it("renders with custom title and description", () => {
    const customTitle = "Custom Error Title";
    const customDescription = "Custom error description";

    render(
      <ErrorState 
        title={customTitle} 
        description={customDescription} 
      />
    );

    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customDescription)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const customClass = "custom-class";
    const { container } = render(<ErrorState className={customClass} />);

    expect(container.firstChild).toHaveClass(customClass);
  });
});