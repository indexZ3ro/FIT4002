import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import React from "react";
import HistoryTile from "../Components/history_tile";
import happy_emoji from "../assets/happy-emoji.svg";
import sad_emoji from "../assets/sad-emoji.svg";
import neutral_emoji from "../assets/neutral-emoji.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const mock_data = [
    {
        name: "Hat",
        date: "13/05/2022",
        lead: "John",
        score: 8.0,
        emoji: happy_emoji,
        emoji_alt: "happy--v1",
        direction: "Towards",
    },

    {
        name: "Laptop",
        date: "13/05/2022",
        lead: "Wiktoria",
        score: 2.3,
        emoji: sad_emoji,
        emoji_alt: "sad--v1",
        direction: "Away",
    },

    {
        name: "Mouse",
        date: "13/05/2022",
        lead: "Jun Redforn",
        score: 6.0,
        emoji: neutral_emoji,
        emoji_alt: "neutral--v1",
        direction: "Neutral",
    },
];

// Create test case for history tile component  - 4 test cases

// Test 1: Check if the component renders successfully
test("Test 1: Check if the component renders successfully", () => {
    render(
        mock_data.map((matrix, index) => {
            return (
                <Router>
                    <HistoryTile
                        name={matrix.name}
                        date={matrix.date}
                        lead={matrix.lead}
                        score={matrix.score}
                        emoji={matrix.emoji}
                        emoji_alt={matrix.emoji_alt}
                        direction={matrix.direction}
                    />
                </Router>
            );
        })
    );

    const element = screen.getByText(/hat/i);

    expect(element).toBeDefined();
});

// Test 2: Check if the component renders the correct date
test("Test 2: Check if the component renders the correct data", () => {
    render(
        mock_data.map((matrix, index) => {
            return (
                <Router>
                    <HistoryTile
                        name={matrix.name}
                        date={matrix.date}
                        lead={matrix.lead}
                        score={matrix.score}
                        emoji={matrix.emoji}
                        emoji_alt={matrix.emoji_alt}
                        direction={matrix.direction}
                    />
                </Router>
            );
        })
    );

    const elements = screen.getAllByText(/13\/05\/2022/i);
    expect(elements[0]).toBeDefined();
});

// Test 3: Check if the component renders the correct emoji
test("Test 3: Check if the component renders the correct emoji", () => {
    render(
        mock_data.map((matrix, index) => {
            return (
                <Router>
                    <HistoryTile
                        name={matrix.name}
                        date={matrix.date}
                        lead={matrix.lead}
                        score={matrix.score}
                        emoji={matrix.emoji}
                        emoji_alt={matrix.emoji_alt}
                        direction={matrix.direction}
                    />
                </Router>
            );
        })
    );

    const element = screen.getByAltText(/happy--v1/i);

    expect(element).toBeDefined();
});

// Test 4: Check if the component renders the correct direction
test("Test 4: Check if the component renders the correct direction", () => {
    render(
        mock_data.map((matrix, index) => {
            return (
                <Router>
                    <HistoryTile
                        name={matrix.name}
                        date={matrix.date}
                        lead={matrix.lead}
                        score={matrix.score}
                        emoji={matrix.emoji}
                        emoji_alt={matrix.emoji_alt}
                        direction={matrix.direction}
                    />
                </Router>
            );
        })
    );

    const element = screen.getByText(/Towards/i);
    expect(element).toBeDefined();
});
