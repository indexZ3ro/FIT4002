import { render, screen } from "@testing-library/react";
import App from "../App";
import React from "react";

// Test if App component renders successfully
test("Test 1: Check if the component renders successfully", () => {
    render(<App />);

    const element = screen.getByText(/Matrix/i);

    expect(element).toBeDefined();
});
