import ACTMatrix from "../components/ACTMatrix/act_matrix.jsx";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";

const mock_data = [
    {
        notes: [
            {
                height: 150,
                text: "",
                width: 150,
                x: 240,
                y: 210,
                id: "-Ng7rH6oPQTxw2rcZ_oY",
            },
        ],
        setNotes: 0,
        emojis: [
            {
                url: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f929.png",
                x: 741,
                y: 308,
                id: "-Ng7s0gUTt3qacKWH1Ub",
            },
        ],
        setEmojis: 0,
        projectId: 1234,
    },
];

// Create test cases for ACT Matrix component - 5 test cases

// Test 1: Check if the component renders successfully
test("Test 1: Check if the component renders successfully", () => {
    const initialState = { output: 10 };
    const mockStore = configureStore();
    let store;
    store = mockStore(initialState);
    render(
        mock_data.map((matrix, index) => {
            <Router>
                <Provider store={store}>
                    <ACTMatrix
                        notes={matrix.notes}
                        setNotes={matrix.setNotes}
                        emojis={matrix.emojis}
                        setEmojis={matrix.setEmojis}
                        projectId={matrix.projectId}
                    />
                </Provider>
            </Router>;
        })
    );
});
