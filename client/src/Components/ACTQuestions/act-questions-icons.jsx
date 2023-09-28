import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import hook from "../../assets/Hook.png";
import heart from "../../assets/Heart.png";
import camera from "../../assets/Camera.png";

const dropdownItems = [
    {
        value: "1",
        imageSource: hook,
    },
    {
        value: "2",
        imageSource: heart,
    },
    {
        value: "3",
        imageSource: camera,
    },
    {
        value: "4",
        imageSource: camera,
    },
];

const ACTQuestionsDropdown = ({
    divRef,
    questionArray,
    selectedQuestionType,
    projectId,
}) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(
        String(selectedQuestionType)
    );
    const dropdownRef = useRef(null);
    const outsideClickRef = useRef(null);
    var displayText = "";
    var questionID = "";

    const toggleDropdown = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleOptionClick = (value) => {
        setSelectedValue(value);
        setIsOpen(false);

        // Get the Question
        axios
            .get(apiUrl + `/api/project/${projectId}/questions`)
            .then((response) => {
                console.log(response.data);
                response.data.forEach((question) => {
                    if (String(question.type) == String(value)) {
                        displayText = question.text;
                        questionID = question.id;
                        divRef.current.textContent = displayText;
                        divRef.current.id = question.id;

                        axios
                            .put(apiUrl + `/api/questions/${questionID}`, {
                                projectKey: projectId,
                            })
                            .then((response) => {
                                console.log(response.data);
                            })
                            .catch((error) => {
                                console.log("Error updating questions:", error);
                            });
                        return;
                    }
                });
            })
            .catch((error) => {
                console.error("Error fetching questions:", error);
            });
    };

    useEffect(() => {
        function handleOutsideClick(event) {
            if (
                isOpen === true &&
                outsideClickRef.current &&
                !outsideClickRef.current.contains(event.target)
            ) {
                document.addEventListener("mousedown", handleOutsideClick);
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <div className="custom-dropdown-container" ref={outsideClickRef}>
            <div className="selected-option" onClick={toggleDropdown}>
                {selectedValue ? (
                    <img
                        src={
                            dropdownItems.find(
                                (item) => item.value === selectedValue
                            ).imageSource
                        }
                        alt={`Selected option: ${selectedValue}`}
                        className="selected-image"
                    />
                ) : (
                    "Select an option"
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
