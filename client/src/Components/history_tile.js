import React, { useEffect } from "react";
import "../css/history-page.css";
import delete_emoji from "../assets/delete.svg";

export const HistoryTile = (props) => {
    const historyOpenMatrix = () => {
        // TO DO
        console.log("opened matrix");
    };
    const historyDeleteMatrix = () => {
        // TO DO
        // console.log("deleted matrix");
    };
    return (
        <button className="history-tile" onClick={historyOpenMatrix()}>
            <div className="history-tile-header">
                <h6>{props.name}</h6>
                <h6>{props.date}</h6>
                <img
                    className="history-delete-matrix"
                    src={delete_emoji}
                    alt="trash--v1"
                    onClick={historyDeleteMatrix()}
                />
            </div>
            <div className="history-tile-preview"></div>
            <h6 className="history-tile-lead">Lead Member: {props.lead}</h6>
            <div
                className={`history-tile-result ${
                    props.direction == "Away" ? "away" : ""
                } ${props.direction == "Neutral" ? "neutral" : ""}`}
            >
                <>
                    <h6
                        className={`history-matrix-score ${
                            props.score <= 2.5 ? "away" : ""
                        } ${
                            props.score > 2.5 && props.score < 7.5
                                ? "neutral"
                                : ""
                        }`}
                    >
                        {props.direction} {props.score}
                    </h6>
                    <img
                        className="history-result-emoji"
                        src={props.emoji}
                        alt={props.emoji_alt}
                    />
                </>
            </div>
        </button>
    );
};

export default HistoryTile;
