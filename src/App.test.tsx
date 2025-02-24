import { describe, it } from "vitest";
import { App } from "./App";
import { render, screen } from "./test/utils";

describe("App component", () => {
  it("renders headline", () => {
    render(<App />);

    screen.debug();

    // check if App components renders headline
  });
});
