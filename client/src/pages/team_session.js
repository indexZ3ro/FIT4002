import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import "../css/team-session.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import TeamHeader from "../Components/TeamHeader/team_header";
import ACTMatrix from "../Components/ACTMatrix/act_matrix";
import ACTQuestions from "../Components/ACTQuestions/act_questions";
import Timer from "../Components/Timer/Timer";
import ACTSidebar from "../Components/ACTSidebar/act-sidebar";
import { realtimeDb } from "../firebase";
import { onValue, ref } from "firebase/database";

const TeamSession = () => {
  const apiUrl = "http://localhost:8080";
  const projectId = "1";

  // handle sticky notes state management here
  const [notes, setNotes] = useState([]);

  // Fetch all sticky notes from the database when the component mounts
  useEffect(() => {
    axios.get(apiUrl + `/api/project/${projectId}/sticky-notes`)
      .then((response) => {
        setNotes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sticky notes:", error);
      });
  }, [projectId, setNotes]);

  // Firebase Realtime Database listener for updates
  useEffect(() => {
      const notesRef = ref(realtimeDb, `Projects/${projectId}/stickyNotes`);

      const unsubscribe = onValue(notesRef, (snapshot) => {
          const updatedNotes = [];
          snapshot.forEach((childSnapshot) => {
              updatedNotes.push({ ...childSnapshot.val(), id: childSnapshot.key });
          });
          // Log the updated notes to the console
          console.log("Updated notes:", updatedNotes);
          setNotes(updatedNotes);
          console.log(notes);
      });

      return () => {
          unsubscribe();
      };
  }, [projectId, setNotes]);

  return (
    <div className="TeamSession">
      <TeamHeader />
      <ACTQuestions />
      <Sidebar />
      <ACTMatrix notes={notes} setNotes={setNotes}/>
      {/* <Timer /> */}
      <ACTSidebar notes={notes} setNotes={setNotes}/>
    </div>
  );
};

export default TeamSession;
