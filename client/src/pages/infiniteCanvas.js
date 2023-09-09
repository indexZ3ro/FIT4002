import React, { useState, useEffect, useContext } from "react";
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
import LocalChangeContext from "../contexts/LocalChangeContext";
import ACTQuestionsContainer from "../Components/ACTQuestions/act_questions_container";

const InfiniteCanvas = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const projectId = "1";
  const { localChanges, setLocalChanges } = useContext(LocalChangeContext);

  // handle sticky notes state management here
  const [notes, setNotes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [emojis,setEmojis] = useState([]);

  // Fetch all sticky notes from the database when the component mounts
  useEffect(() => {
    axios.get(apiUrl + `/api/project/${projectId}/sticky-notes`)
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
    axios.get(apiUrl + `/api/project/${projectId}/questions`)
      .then((response) => {
        setQuestions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [projectId, setQuestions]);

  // Firebase Realtime Database listener for updates Sticky Notes
  useEffect(() => {
      const notesRef = ref(realtimeDb, `Projects/${projectId}/stickyNotes`);

      const unsubscribe = onValue(notesRef, (snapshot) => {
          const updatedNotes = [];
          snapshot.forEach((childSnapshot) => {
            const noteId = childSnapshot.key;
            const noteData = childSnapshot.val();
            if (localChanges.some(change => change.id === noteId)) {
                // If the note ID is in localChanges, then retain the current note data
                // Find the current note data
                const currentNote = notes.find(note => note.id === noteId);
                if (currentNote) {
                  updatedNotes.push(currentNote);
                  const currentTime = Date.now();
                  
                  setLocalChanges(prevChanges =>
                    prevChanges.filter(change =>{
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


  //Firebase Realtime Database listener for updates Emojis
  useEffect(() => {
    const emojiRef = ref(realtimeDb, `Projects/${projectId}/emoji`);

    const unsubscribe = onValue(emojiRef, (snapshot) => {
        const updatedEmoji = [];
        snapshot.forEach((childSnapshot) => {
          const emojiId = childSnapshot.key;
          const emojiData = childSnapshot.val();
          if (localChanges.some(change => change.id === emojiId)) {
              // If the emoji ID is in localChanges, then retain the current note data
              // Find the current note data
              const currenEmoji = emojis.find(emoji => emoji.id === emojiId);
              if (currenEmoji) {
                updatedEmoji.push(currenEmoji);
                const currentTime = Date.now();
                
                setLocalChanges(prevChanges =>
                  prevChanges.filter(change =>{
                    const timeDifference = currentTime - change.timestamp;
                    return !(change.id === emojiId && timeDifference > 5000);
                  })
                );
              }
          } else {
            updatedEmoji.push({ ...emojiData, id: emojiId });
              // console.log("local changes: ", localChanges);
              // console.log(noteId);
          }
      });
        // Log the updated notes to the console
        console.log("Updated Emoji:", updatedEmoji);
        setEmojis(updatedEmoji);
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
      <ACTSidebar notes={notes} setNotes={setNotes} emojis ={emojis} setEmojis= {setEmojis}/>
      
      <div>
        <ACTMatrix notes={notes} setNotes={setNotes} emojis ={emojis} setEmojis= {setEmojis}/>
      </div>
    </div>
  );
};

export default InfiniteCanvas;
