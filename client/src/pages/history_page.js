import React, { useEffect } from "react";
import "../css/history-page.css";
import HistoryTile from "../Components/history_tile";

const HistoryPage = () => {
    // TODO: Load in saved matrix data from database
    const matrix_data = [
        {
            name: "Hat",
            date: "13/05/2022",
            lead: "John",
            score: 8.0,
            emoji: "https://img.icons8.com/material/24/40C057/happy--v1.png",
            emoji_alt: "happy--v1",
            direction: "Towards",
        },

        {
            name: "Laptop",
            date: "13/05/2022",
            lead: "Wiktoria",
            score: 2.3,
            emoji: "https://img.icons8.com/material/24/FA5252/sad--v1.png",
            emoji_alt: "sad--v1",
            direction: "Away",
        },

        {
            name: "Mouse",
            date: "13/05/2022",
            lead: "Jun Redforn",
            score: 6.0,
            emoji: "https://img.icons8.com/material/24/FAB005/neutral-emoticon--v1.png",
            emoji_alt: "neutral--v1",
            direction: "Neutral",
        },
    ];

    console.log(matrix_data);
    return (
        <div className="history-page">
            <h4 className="history-title">History</h4>
            <div className="history-tiles" id="history-tiles">
                <HistoryTile
                    name="John"
                    date="323"
                    lead="John"
                    score="7"
                    emoji="f"
                    emoji_alt="f"
                    direction="f"
                ></HistoryTile>
                <HistoryTile
                    name="John"
                    date="323"
                    lead="John"
                    score="7"
                    emoji="f"
                    emoji_alt="f"
                    direction="f"
                ></HistoryTile>
                <HistoryTile
                    name="John"
                    date="323"
                    lead="John"
                    score="7"
                    emoji="f"
                    emoji_alt="f"
                    direction="f"
                ></HistoryTile>
                <HistoryTile
                    name="John"
                    date="323"
                    lead="John"
                    score="7"
                    emoji="f"
                    emoji_alt="f"
                    direction="f"
                ></HistoryTile>
                <HistoryTile
                    name="John"
                    date="323"
                    lead="John"
                    score="7"
                    emoji="f"
                    emoji_alt="f"
                    direction="f"
                ></HistoryTile>
                <HistoryTile
                    name="John"
                    date="323"
                    lead="John"
                    score="7"
                    emoji="f"
                    emoji_alt="f"
                    direction="f"
                ></HistoryTile>
                <HistoryTile
                    name="John"
                    date="323"
                    lead="John"
                    score="7"
                    emoji="f"
                    emoji_alt="f"
                    direction="f"
                ></HistoryTile>
                <HistoryTile
                    name="John"
                    date="323"
                    lead="John"
                    score="7"
                    emoji="f"
                    emoji_alt="f"
                    direction="f"
                ></HistoryTile>

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
