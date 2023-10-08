import Home from "../pages/home.jsx";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Create test cases for the home page - 3 test cases
// Test case 1: Test that the home page renders correctly
test("Test that the home page renders correctly", () => {
    const initialState = { output: 10 };
    const mockStore = configureStore();
    let store;
    store = mockStore(initialState);
    render(
        <Router>
            <Provider store={store}>
                <Home />
            </Provider>
        </Router>
    );

    const matrixElements = screen.getAllByText(/Solo Matrix/i);
    expect(matrixElements).toBeDefined();

    const createElements = screen.getAllByText(/Create/i);
    expect(createElements).toBeDefined();
});
