import { render, screen } from "@testing-library/react";
import LogInPage from "../pages/SignupPage";
import { expect, test } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "../pages/SignupPage";

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
                <SignUpPage />
            </Provider>
        </Router>
    );

    const accountElement = screen.getByText(/Already have an account?/i);
    expect(accountElement).toBeDefined();

    const signUpElements = screen.getAllByText(/Sign Up/i);
    expect(signUpElements[0]).toBeDefined();
    expect(signUpElements[1]).toBeDefined();
});
