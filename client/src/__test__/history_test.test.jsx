import { render, screen } from '@testing-library/react'
import HistoryTile from '../components/history_tile.js';
import happy_emoji from "../assets/happy-emoji.svg";
import sad_emoji from "../assets/sad-emoji.svg";
import neutral_emoji from "../assets/neutral-emoji.svg";

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
    }
]

test("Example 1 renders successfully", () => {
    render(mock_data.map((matrix) => {
        return (
            <HistoryTile
                name={matrix.name}
                date={matrix.date}
                lead={matrix.lead}
                score={matrix.score}
                emoji={matrix.emoji}
                emoji_alt={matrix.emoji_alt}
                direction={matrix.direction}
            />
        );
    }));

    const element = screen.getByText(/hat/i);

    expect(element).toBeInTheDocument();
})