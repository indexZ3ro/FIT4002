import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";

const dropdownItems = [
  {
    value: '1',
    imageSource: require('../../assets/Hook.png'),
  },
  {
    value: '2',
    imageSource: require('../../assets/Heart.png'),
  },
  {
    value: '3',
    imageSource: require('../../assets/Camera.png'),
  },
  {
    value: '4',
    imageSource: require('../../assets/Camera.png'),
  }
];

const ACTQuestionsDropdown = ( {divRef, questionArray, selectedQuestionId} ) => {
  const apiUrl = "https://project-5389016526708021196.ts.r.appspot.com";
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('1');
  const dropdownRef = useRef(null);
  const outsideClickRef = useRef(null);
  const projectId = "1";
  const [questions, setQuestions] = useState([]);
  var displayText = "";
  var questionID = "";
  const [newQuestion, setNewQuestion] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  useEffect(() => {
    console.log(newQuestion);
    if (newQuestion === true) {
      const value = parseInt(selectedValue);

      divRef.current.textContent = "";
      axios
      .post(apiUrl + `/api/questions/`, {
          projectKey: 1,
          text: "",
          type: value,
          status: "active"
      })
      .then((response) => {
          console.log("Question created successfully:", response.data);
      })
      .catch((error) => {
          console.error("Error creating question:", error);
      });
    }

  }, [newQuestion]);

  const handleOptionClick = (value) => {
    if (!isInitialMount) {
      var localNew = true;
      setSelectedValue(value);
      setIsOpen(false);
  
      // Get the Question
      axios.get(apiUrl + `/api/project/${projectId}/questions`)
      .then((response) => {
          setQuestions(response.data);
          console.log(response.data);
      })
      .catch((error) => {
          console.error("Error fetching questions:", error);
      });
  
      questions.forEach(question => {
          if (String(question.type) == String(value)) {
            displayText = question.text;
            questionID = question.id;
            divRef.current.textContent = displayText;
            setNewQuestion(false);
            localNew = false;

            // Get the Question
            axios.get(apiUrl + `/api/project/${projectId}/questions`)
              .then((response) => {
                setQuestions(response.data);
                console.log(response.data);
                const selectedQuestion = questions.find(question => question.status === "active");
                console.log(selectedQuestion.id);
                // Make old question inactive
                axios
                .put(apiUrl + `/api/questions/${selectedQuestion.id}`, {
                    projectKey: projectId,
                    text: selectedQuestion.text,
                    type: selectedQuestion.type,
                    status: "inactive"
                })
                .then((response) => {
                  console.log(selectedQuestion.type);
                  console.log("Question updated successfully:", response.data);

                  var newSelectedQuestion = questions.find(question => question.id == questionID);
                  // Set new question to be active
                  axios
                  .put(apiUrl + `/api/questions/${newSelectedQuestion.id}`, {
                    projectKey: projectId,
                    text: newSelectedQuestion.text,
                    type: newSelectedQuestion.type,
                    status: "active"
                  }) 
                  .then((response) => {
                      console.log("Question updated successfully:", response.data);
                  })
                  .catch((error) => {
                      console.error("Error updating question:", error);
                  });
                })
                .catch((error) => {
                    console.error("Error updating question:", error);
                });
              })
              .catch((error) => {
                console.error("Error fetching questions:", error);
            });
            return;
          }
      });

      if (localNew === true) {
        setNewQuestion(true);
      }
      
    } else {
      setIsInitialMount(false);
    }
  }

  useEffect(() => {
    function handleOutsideClick(event) {
      if (isOpen === true && outsideClickRef.current && !outsideClickRef.current.contains(event.target)) {
        document.addEventListener('mousedown', handleOutsideClick);
        setIsOpen(false);
      }
    }

    if (isOpen) {
        document.addEventListener('mousedown', handleOutsideClick);
      } else {
        document.removeEventListener('mousedown', handleOutsideClick);
      }
    

    return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="custom-dropdown-container" ref={outsideClickRef}>
      <div className="selected-option" onClick={toggleDropdown}>
        {selectedValue ? (
          <img
            src={
              dropdownItems.find((item) => item.value === selectedValue)
                .imageSource
            }
            alt={`Selected option: ${selectedValue}`}
            className="selected-image"
          />
        ) : (
          'Select an option'
        )}
      </div>
      {isOpen && (
        <div className="dropdown-options" ref={dropdownRef}> 
          {dropdownItems.map((item) => (
            <div
              key={item.value}
              className="dropdown-option"
              onClick={() => handleOptionClick(item.value)}
            >
              <img
                src={item.imageSource}
                alt={`Option: ${item.value}`}
                className="option-image"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ACTQuestionsDropdown;
