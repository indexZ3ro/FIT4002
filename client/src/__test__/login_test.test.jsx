import { render, screen } from "@testing-library/react";
import LogInPage from "../pages/LogInPage";
import { expect, test } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const initialState = { output: 10 };
const mockStore = configureStore();
let store;

// Create test cases for login page - 1 test cases

// Test 1: Check if the component renders successfully
test("Test 1: Check if the component renders successfully", () => {
    store = mockStore(initialState);
    render(
        <Router>
            <Provider store={store}>
                <LogInPage />
            </Provider>
        </Router>
    );

    const newHereElement = screen.getByText(/New Here?/i);
    expect(newHereElement).toBeDefined();

    const loginElement = screen.getByText(/Log In/i);
    expect(loginElement).toBeDefined();
});
