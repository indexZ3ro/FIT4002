import SettingsPage from "../pages/settings_page.jsx";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Create test cases for the settings page - 3 test cases
// Test case 1: Test that the settings page renders correctly
test("Test that the settings page renders correctly", () => {
    render(
        <Router>
            <SettingsPage />
        </Router>
    );

    const settingsElement = screen.getByText(/Settings/i);
    expect(settingsElement).toBeDefined();

    const updateElement = screen.getByText(/Update/i);
    expect(updateElement).toBeDefined();
});
