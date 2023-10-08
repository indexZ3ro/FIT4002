import InfiniteCanvas from "../pages/infiniteCanvas.jsx";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Create test cases for InfiniteCanvas component - 1 test cases

// Test 1: Check if the component renders successfully
test("Test 1: Check if the component renders successfully", () => {
    const initialState = { output: 10 };
    const mockStore = configureStore();
    let store;
    store = mockStore(initialState);
    render(
        <Router>
            <Provider store={store}>
                <InfiniteCanvas />
            </Provider>
        </Router>
    );

    const textBoxElement = screen.getByRole("textbox");
    expect(textBoxElement).toBeDefined();

    const imgElement = screen.getAllByRole("img");
    expect(imgElement).toBeDefined();
});
