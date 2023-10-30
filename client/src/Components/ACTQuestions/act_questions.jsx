import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "../../index.css";
import { realtimeDb } from "../../firebase";
import QuestionContext from "../../contexts/QuestionContext";
import { onValue, ref } from "firebase/database";
import ACTQuestionsDropdown from "./act-questions-icons";
import Line from "../../assets/Line.svg";

const ACTQuestions = ({ id, text, type, projectId }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [name, setName] = useState(text || ""); // Renamed state variable from 'Question' to 'name'
  const divRef = useRef();
  // divRef.current.textContent = text;
  const { localQuestions, setLocalQuestions } = useContext(QuestionContext);
  const [isUpdated, setIsUpdated] = useState(false); // Flag to track user modification
  const [questions, setQuestions] = useState([]);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(id);

  useEffect(() => {
    divRef.current.textContent = name;
  }, [name]);

  useEffect(() => {
    // Make the axios request to update the question on the server
    if (!isInitialMount && isUpdated) {
      axios
        .put(apiUrl + `/api/questionDesc/${selectedQuestion}`, {
          projectKey: projectId,
          text: name,
        })
        .then((response) => {
          console.log("Question updated successfully:", response.data);
          setIsUpdated(false); // Reset the isUpdated flag after the update
        })
        .catch((error) => {
          console.error("Error updating question:", error);
        });
    } else {
      // Set the flag to false after the component has mounted
      setIsInitialMount(false);
    }
  }, [name]);

  // // Get the Questions
  useEffect(() => {
    axios
      .get(apiUrl + `/api/project/${projectId}/questions`)
      .then((response) => {
        setQuestions(response.data);
        // console.log(response.data);

        questions.forEach((question) => {
          if (question.status == "active") {
            setSelectedQuestion(question.id);
            return;
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [projectId, name]);

  const handleInput = (e) => {
    if (divRef.current.id != selectedQuestion) {
      setSelectedQuestion(divRef.current.id);
    }
    setName(e.target.textContent);
    setIsUpdated(true);
  };

  return (

    <div className='act-questions-inner'>
      <ACTQuestionsDropdown divRef={divRef} questionArray={questions} selectedQuestionType={type} projectId={projectId}/>
      <div ref={divRef} id={selectedQuestion} className='act-questions' onInput={handleInput}></div>
    </div>
  );
};

export default ACTQuestions;
