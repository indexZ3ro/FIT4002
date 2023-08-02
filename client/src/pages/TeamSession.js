import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import "../css/TeamSession.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import TeamHeader from "../Components/TeamHeader/TeamHeader";
import ACTMatrix from "../Components/ACTMatrix/ACTMatrix";
import Timer from "../Components/Timer/Timer";
import ACTSidebar from "../Components/ACTSidebar/ACTSidebar";

const TeamSession = () => {
  const apiUrl = "http://localhost:8080";

  // handle sticky notes state management here
  const [notes, setNotes] = useState([]);

  // Fetch all sticky notes from the database when the component mounts
  useEffect(() => {
    axios.get(apiUrl + "/api/sticky-notes")
      .then((response) => {
        // The response data will contain an array of sticky notes
        // Update the notes state with the fetched data
        setNotes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sticky notes:", error);
      });
  }, []);

  return (
    <div className="TeamSession">
      <TeamHeader />
      <Sidebar />
      <ACTMatrix notes={notes} setNotes={setNotes}/>
      {/* <Timer /> */}
      <ACTSidebar notes={notes} setNotes={setNotes}/>
    </div>
  );
};

export default TeamSession;
