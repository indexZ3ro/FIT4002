import React, { useState, useRef, useEffect, useContext } from "react";
import Draggable from "react-draggable";
import axios from "axios";
import LocalChangeContext from "../../contexts/LocalChangeContext";
import UndoContext from "../../contexts/UndoContext";
import { Rnd } from "react-rnd";
const Note = ({
    x,
    y,
    id,
    width = 150,
    height = 150,
    text,
    scale,
    projectId,
    noteColour,
    status = ""
}) => {
    const { localChanges, setLocalChanges } = useContext(LocalChangeContext);
    const {localUndoIds, setLocalUndoIds} = useContext(UndoContext);
    
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isUpdated, setIsUpdated] = useState(false); // Flag to track user modification
    const [isInitialMount, setIsInitialMount] = useState(true); // Flag to track initial mount

    const [noteText, setNoteText] = useState(text || "");
    const textareaRef = useRef(null);
    const [position, setPosition] = useState({ x, y });
    const [isDraggingEnabled, setIsDraggingEnabled] = useState(true);
    const [size, setSize] = useState({ width, height });


    if (noteColour === undefined || noteColour === null || noteColour === "") {
        noteColour = "#ffe4b5";
    }
    const handleNoteTextChange = (e) => {
        setNoteText(e.target.value);
        setIsUpdated(true);
        const newChange = {
            id: id,
            timestamp: Date.now(), // Gets the current timestamp in milliseconds
        };
        setLocalChanges((prevChanges) => [...prevChanges, newChange]);
    };

    const handleTextareaClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        textareaRef.current.selectionStart = 0;
        textareaRef.current.selectionEnd = noteText.length;
    };
    const calculateFontSize = () => {
        const textLength = noteText.length;
        const area = size.width * size.height;
    
        // You may need to adjust these constants to get the desired result
        const maxTextLength = 200; // Adjust based on your specific use case
        const maxArea = 400 * 400; // Adjust to the maximum expected area of the note
    
        // Initial large font size and minimum font size cap
        const maxFontSize = 40;
        const minFontSize = 16;
    
        // Calculate reductions in font size based on text length and note area
        const textLengthProportion = Math.min(textLength, maxTextLength) / maxTextLength;
        const areaProportion = area / maxArea;
    
        // Calculate final font size based on both proportions, ensuring it stays within min and max bounds
        const fontSize = maxFontSize - 
                         (maxFontSize - minFontSize) * 
                         Math.max(textLengthProportion, areaProportion);
    
        return `${Math.max(minFontSize, Math.min(maxFontSize, fontSize))}px`;
    };

    const handleTextareaFocus = () => {
        setIsDraggingEnabled(false);
    };

    const handleTextareaBlur = () => {
        setIsDraggingEnabled(true);
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
       
    }, [x, y]);

    useEffect(() => {
        setSize({ width, height });
      
    }, [width, height]);
    useEffect(() => {
        // Make the axios request to update the sticky note on the server
        if (!isInitialMount && isUpdated) {
         
            axios
                .put(apiUrl + `/api/sticky-notes/${id}`, {
                    projectKey: projectId,
                    x: position.x,
                    y: position.y,
                    width: size.width,
                    height: size.height,
                    text: noteText
                })
                .then((response) => {
                    console.log(
                        "Sticky note updated successfully:",
                        response.data
                    );
                    setIsUpdated(false); // Reset the isUpdated flag after the update
                })
                .catch((error) => {
                    console.error("Error updating sticky note:", error);
                });
        } else {
            // Set the flag to false after the component has mounted
            setIsInitialMount(false);
        }
    }, [position, size, noteText, id, isUpdated, isInitialMount,status]);

    const handleDelete = () => {
        // API request to delete the sticky note from the server
   
        axios
        .put(`${apiUrl}/api/sticky-notes-restore/${id}`, {
            projectKey: projectId,
            x: position.x,
            y: position.y,
            width: size.width,
            height: size.height,
            text: noteText,
            status: "Deactive"  // Update this field to set the status to "Deactive"
        })
        .then((response) => {
            console.log(id);
            console.log("Sticky note deactivated successfully:", response.data);
            setLocalUndoIds(prevIds => [...prevIds, id]);
        })
        .catch((error) => {
            console.error("Error deactivating sticky note:", error);
        });
    };
    const preventDefault = (event) => {
        event.preventDefault();
    };
    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };



    return (
        <Rnd
            disableDragging={!isDraggingEnabled}
            maxWidth={400}
            maxHeight={400}
            minWidth={150}
            minHeight={150}
            scale={scale}
            position={{ x: position.x, y: position.y }}
            size={{ width: size.width, height: size.height }}
            onDragStop={handleDragStop}
            onResizeStop={(e, direction, ref, delta, position) => {
                setSize({ width: ref.style.width, height: ref.style.height });
                setPosition(position);
                setIsUpdated(true);
            }}
        >
            <div
                className="note-container"
                style={{
                    margin: 0,
                    height: "100%",
                    width: "100%",
                    backgroundColor: `${noteColour}`,
                    border: `2px solid ${noteColour}`,
                }}
            >
                <button className="delete-note" onClick={handleDelete}>
                    ×
                </button>
                <textarea
                    ref={textareaRef}
                    className="note-text"
                    onClick={handleTextareaClick}
                    value={noteText}
                    onBlur={handleTextareaBlur}
                    onChange={handleNoteTextChange}
                    onDrop={handleDrop}
                    onResize={preventDefault}
                    style={{
                        fontSize: calculateFontSize(),
                        border: "none",
                        outline: "none",
                    }}
                ></textarea>
            </div>
        </Rnd>
    );
};

// Define the default prop value for the 'text' prop
Note.defaultProps = {
    text: null, // Replace 'null' with the default value you want
};

export default Note;
