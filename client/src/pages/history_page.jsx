import React, { useEffect, useState } from "react";
import "../css/history-page.css";
import HistoryTile from "../Components/history_tile";
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
                    
                    setHistoryMatrix(response.data);
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
                            key={matrix.projectKey}
                            id={matrix.projectKey}
                            name={matrix.projectName}
                            date={matrix.dateCreated}
                            lead={matrix.adminUserName}
                            numUsers={matrix.numUsers}
                            numNotes={matrix.numNotes}
                            // score={matrix.score}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default HistoryPage;
