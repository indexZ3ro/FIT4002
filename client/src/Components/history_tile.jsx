import React, { useEffect, useState } from "react";
import "../css/history-page.css";
import delete_emoji from "../assets/delete.svg";
import happy_emoji from "../assets/happy-emoji.svg";
import sad_emoji from "../assets/sad-emoji.svg";
import neutral_emoji from "../assets/neutral-emoji.svg";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from 'axios';

export const HistoryTile = (props) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [projectID, setProjectID] = useState(props.id);
    const navigate = useNavigate();
    const directions = ["Away", "Neutral", "Towards"];
    const displayEmojis = [sad_emoji, neutral_emoji, happy_emoji];
    const altEmojis = ["sad--v1", "neutral--v1", "happy--v1"];
    const [translatedScore, setTranslatedScore] = useState();
    const [loading, setLoading] = useState(true);

    const historyOpenMatrix = () => {
        console.log("opened matrix");
        navigate(`/ACTMatrixSession/${projectID}`);
    };

    const refreshPage = () => {
        window.location.reload(false);
    }

    const historyDeleteMatrix = () => { 
        onAuthStateChanged(auth, (user) => {
            if (user) {
                axios.put(apiUrl + "/api/removeUserFromMatrix/", { projectKey: projectID, userID: user.uid })
                .then((response) => {
                    console.log("Deleted matrix");
                    refreshPage();
                })
                .catch((error) => {
                    console.log("Error getting user history:", error);
                    setLoading(false);
                });
            } else {
                // User is signed out
                // ...
                navigate("/");
                console.log("User is logged out");
            }
        })
    };

    useEffect(() => {
        if (props.score <= 3) {
            setTranslatedScore(0);
        } else if (props.score > 3 && props.score <= 7) {
            setTranslatedScore(1);
        } else {
            setTranslatedScore(2);
        }
    }, []);
    
    return (
        <button className="history-tile" onClick={historyOpenMatrix}>
            <div className="history-tile-header">
                <h6>{props.name}</h6>
                <h6>{props.date}</h6>
                <img
                    className="history-delete-matrix"
                    src={delete_emoji}
                    alt="trash--v1"
                    onClick={(e) => {
                        historyDeleteMatrix();
                        e.stopPropagation();
                    }}
                />
            </div>
            <div className="history-tile-preview"></div>
            <h6 className="history-tile-lead">Lead Member: {props.lead}</h6>
            <div
                className={`history-tile-result ${
                    directions[translatedScore] == "Away" ? "away" : ""
                } ${directions[translatedScore] == "Neutral" ? "neutral" : ""}`}
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
                        {directions[translatedScore]} {props.score}
                    </h6>
                    <img
                        className="history-result-emoji"
                        src={displayEmojis[translatedScore]}
                        alt={altEmojis[translatedScore]}
                    />
                </>
            </div>
        </button>
    );
};

export default HistoryTile;
