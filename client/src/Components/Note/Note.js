import React, { useState, useRef, useEffect, useContext } from "react";
import Draggable from "react-draggable";
import axios from "axios";
import LocalChangeContext from "../../contexts/LocalChangeContext";

const Note = ({ x, y, id, text }) => {
    const { localChanges, setLocalChanges } = useContext(LocalChangeContext);
    const apiUrl = "https://project-5389016526708021196.ts.r.appspot.com";
    const [isUpdated, setIsUpdated] = useState(false); // Flag to track user modification
    const [isInitialMount, setIsInitialMount] = useState(true); // Flag to track initial mount

    const [noteText, setNoteText] = useState(text || "");
    const textareaRef = useRef(null);
    const [position, setPosition] = useState({ x, y });

    const handleNoteTextChange = (e) => {
        setNoteText(e.target.value);
        setIsUpdated(true);
        const newChange = {
            id: id,
            timestamp: Date.now() // Gets the current timestamp in milliseconds
          };
        setLocalChanges(prevChanges => [...prevChanges, newChange]);
    };

    const handleTextareaClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        textareaRef.current.selectionStart = 0;
        textareaRef.current.selectionEnd = noteText.length;
    };
    const calculateFontSize = () => {
        const textLength = noteText.length;
        const maxFontSize = 40;
        const minFontSize = 16;
        const fontSize = maxFontSize - (textLength * (maxFontSize - minFontSize)) / 50;
        return `${Math.max(fontSize, minFontSize)}px`;
    };

    // Define a function to update the position state
    const handleDragStop = (e, ui) => {
        setPosition({ x: ui.lastX, y: ui.lastY });
        setIsUpdated(true);
    };

    useEffect(() => {
        setNoteText(text || "");
    }, [text]);

    useEffect(() => {
        setPosition({ x, y });
        console.log(x, y);
    }, [x, y]);

    useEffect(() => {
        // Make the axios request to update the sticky note on the server
        if (!isInitialMount && isUpdated) {
            axios
            .put(apiUrl + `/api/sticky-notes/${id}`, {
                projectKey: 1,
                x: position.x,
                y: position.y,
                text: noteText,
            })
            .then((response) => {
                console.log("Sticky note updated successfully:", response.data);
                setIsUpdated(false); // Reset the isUpdated flag after the update
            })
            .catch((error) => {
                console.error("Error updating sticky note:", error);
            });
        } else {
            // Set the flag to false after the component has mounted
            setIsInitialMount(false);
          }
      }, [position, noteText, id, isUpdated, isInitialMount]);

    const handleDelete = () => {
        // API request to delete the sticky note from the server
        axios.delete(`${apiUrl}/api/sticky-notes/${id}`, {
                data: {projectKey: 1 }
            })
            .then(response => {
                console.log(id);
                console.log("Sticky note deleted successfully:", response.data);
            })
            .catch(error => {
                console.error("Error deleting sticky note:", error);
            });
    };

    return (
        <Draggable onStop={handleDragStop}  position={{ x: position.x, y: position.y }}>
            <div
                className="note-container"
            >
                <button className="delete-note" onClick={handleDelete}>×</button>
                <textarea
                    ref={textareaRef}
                    className="note-text"
                    value={noteText}
                    onChange={handleNoteTextChange}
                    onClick={handleTextareaClick}
                    style={{
                        fontSize: calculateFontSize(),
                        border: "none",
                        outline: "none",
                    }}
                />
            </div>
        </Draggable>
    );
};

// Define the default prop value for the 'text' prop
Note.defaultProps = {
    text: null, // Replace 'null' with the default value you want
};

export default Note
