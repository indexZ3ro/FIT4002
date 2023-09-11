import React, { useEffect } from "react";
import "../css/history-page.css";
import HistoryTile from "../Components/history_tile";
import happy_emoji from "../assets/happy-emoji.svg";
import sad_emoji from "../assets/sad-emoji.svg";
import neutral_emoji from "../assets/neutral-emoji.svg";

const HistoryPage = () => {
    // TODO: Load in saved matrix data from database
    const matrix_data = [
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

    return (
        <div className="history-page">
            <h4 className="history-title">History</h4>
            <div className="history-tiles" id="history-tiles">
                {matrix_data.map((matrix) => {
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
                })}
            </div>
        </div>
    );
};

export default HistoryPage;
