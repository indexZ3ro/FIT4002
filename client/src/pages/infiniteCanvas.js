import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../App.css";
import "../css/session.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import TeamHeader from "../Components/TeamHeader/team_header";
import ACTMatrix from "../Components/ACTMatrix/act_matrix";
import ACTQuestions from "../Components/ACTQuestions/act_questions";
import Timer from "../Components/Timer/Timer";
import ACTSidebar from "../Components/ACTSidebar/act-sidebar";
import { realtimeDb } from "../firebase";
import { onValue, ref } from "firebase/database";
import LocalChangeContext from "../contexts/LocalChangeContext";
import ACTQuestionsContainer from "../Components/ACTQuestions/act_questions_container";
import ACT from "../assets/ACT.svg";
import { useParams } from 'react-router-dom';

const InfiniteCanvas = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { projectId } = useParams();
  const { localChanges, setLocalChanges } = useContext(LocalChangeContext);

  // handle sticky notes state management here
  const [notes, setNotes] = useState([]);
  const [questions, setQuestions] = useState([]);

  // Fetch all sticky notes from the database when the component mounts
  useEffect(() => {
    axios
      .get(apiUrl + `/api/project/${projectId}/sticky-notes`)
      .then((response) => {
        setNotes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("apiURL is:" + apiUrl);
        console.error("Error fetching sticky notes:", error);
      });
  }, [projectId, setNotes]);

  // Get the Question
  useEffect(() => {
    axios
      .get(apiUrl + `/api/project/${projectId}/questions`)
      .then((response) => {
        setQuestions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [projectId, setQuestions]);

  // Firebase Realtime Database listener for updates
  useEffect(() => {
    const notesRef = ref(realtimeDb, `Projects/${projectId}/stickyNotes`);

    const unsubscribe = onValue(notesRef, (snapshot) => {
      const updatedNotes = [];
      snapshot.forEach((childSnapshot) => {
        const noteId = childSnapshot.key;
        const noteData = childSnapshot.val();
        if (localChanges.some((change) => change.id === noteId)) {
          // If the note ID is in localChanges, then retain the current note data
          // Find the current note data
          const currentNote = notes.find((note) => note.id === noteId);
          if (currentNote) {
            updatedNotes.push(currentNote);
            const currentTime = Date.now();

            setLocalChanges((prevChanges) =>
              prevChanges.filter((change) => {
                const timeDifference = currentTime - change.timestamp;
                return !(change.id === noteId && timeDifference > 5000);
              })
            );
          }
        } else {
          updatedNotes.push({ ...noteData, id: noteId });
          // console.log("local changes: ", localChanges);
          // console.log(noteId);
        }
      });
      // Log the updated notes to the console
      console.log("Updated notes:", updatedNotes);
      setNotes(updatedNotes);
    });

    return () => {
      unsubscribe();
    };
  }, [projectId, localChanges]);

  return (

    <div className="TeamSession">
      <TeamHeader />
      <ACTQuestionsContainer questions={questions}/>
      <Sidebar />
      <ACTSidebar notes={notes} setNotes={setNotes} projectId={projectId}/>
      <div>
        <ACTMatrix notes={notes} setNotes={setNotes} projectId={projectId}/>

      </div>
    </div>
  );
};

export default InfiniteCanvas;
