import React, { useEffect, useState } from "react";
import "../css/history-page.css";
import HistoryTile from "../Components/history_tile";
import happy_emoji from "../assets/happy-emoji.svg";
import sad_emoji from "../assets/sad-emoji.svg";
import neutral_emoji from "../assets/neutral-emoji.svg";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from 'axios';

const HistoryPage = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [historyMatrix, setHistoryMatrix] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load in saved matrix data from database
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                axios.get(apiUrl + `/api/getMatrixHistory/${user.uid}`)
                .then((response) => {
                    
                    setHistoryMatrix(prevHistoryMatrix => [
                        ...prevHistoryMatrix,
                        ...response.data
                    ]);
                    setLoading(false);

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
    }, []);


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

    if (loading) {
        return <div>Loading...</div>;  // Style the Loading Better
    }
    
    return (
        <div className="history-page">
            <h4 className="history-title">History</h4>
            <div className="history-tiles" id="history-tiles">
                {historyMatrix.map((matrix) => {
                    return (
                        <HistoryTile
                            id={matrix.projectKey}
                            key={matrix.projectKey}
                            name={matrix.projectName}
                            // date={matrix.date}
                            lead={matrix.adminUserName}
                            // score={matrix.score}
                            // emoji={matrix.emoji}
                            // emoji_alt={matrix.emoji_alt}
                            // direction={matrix.direction}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default HistoryPage;
