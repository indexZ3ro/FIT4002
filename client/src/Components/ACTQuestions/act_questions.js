import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from "axios";
import '../../index.css';
import { realtimeDb } from "../../firebase";
import QuestionContext from "../../contexts/QuestionContext";
import { onValue, ref } from "firebase/database";
import ACTQuestionsDropdown from './act-questions-icons';

const ACTQuestions = ({ id, text, type }) => {
  
  const apiUrl = process.env.REACT_APP_API_URL;

  const [name, setName] = useState(text || ''); // Renamed state variable from 'Question' to 'name'
  const divRef = useRef();
  const projectId = "1";
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
        .put(apiUrl + `/api/questions/${id}`, {
            projectKey: 1,
            text: name,
            type: type,
            status: "active"
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
    axios.get(apiUrl + `/api/project/${projectId}/questions`)
      .then((response) => {
        setQuestions(response.data);
        console.log(response.data);

        questions.forEach(question => {
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

//   useEffect(() => {
//     const questionsRef = ref(realtimeDb, `Projects/${projectId}/questions`);
    

//     const unsubscribe = onValue(questionsRef, (snapshot) => {
//         const updatedQuestions = [];
//         snapshot.forEach((childSnapshot) => {
//           const questionId = childSnapshot.key;
//           const questionData = childSnapshot.val();
//           if (localQuestions.some(change => change.id === questionId)) {
//               // If the question ID is in localQuestions, then retain the current question data
//               // Find the current question data
//               const currentQuestion = questions.find(question => question.id === questionId);
//               if (currentQuestion) {
//                 updatedQuestions.push(currentQuestion);
//                 const currentTime = Date.now();
                
//                 setLocalQuestions(prevChanges =>
//                   prevChanges.filter(change =>{
//                     const timeDifference = currentTime - change.timestamp;
//                     return !(change.id === questionId && timeDifference > 5000);
//                   })
//                 );
//               }
//           } else {
//               updatedQuestions.push({ ...questionData, id: questionId });
//               console.log("local changes: ", localQuestions);
//               console.log(questionId);
//           }
//       });
//         // Log the updated questions to the console
//         console.log("Updated questions:", updatedQuestions);
//         setLocalQuestions(updatedQuestions);
//     });

//     return () => {
//         unsubscribe();
//     };
// }, [projectId, localQuestions]);


  const handleInput = (e) => {
    setName(e.target.textContent);
    setIsUpdated(true);
  };

  return (
    <div className='act-questions-inner'>
      <ACTQuestionsDropdown divRef={divRef} questionArray={questions} selectedQuestionId={id}/>
      <div className='act-questions-label'>Question</div>
      <div ref={divRef} className='act-questions' contentEditable onInput={handleInput}></div>
    </div>
  );
}

export default ACTQuestions;
