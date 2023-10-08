import React, { useState, useRef, useEffect, useContext } from "react";
import Draggable from "react-draggable";
import axios from "axios";
import LocalChangeContext from "../../contexts/LocalChangeContext";
import {Rnd} from "react-rnd";
const Note = ({ x, y, id, width = 150, height= 150, text, scale, projectId, noteColour }) => {

    const { localChanges, setLocalChanges } = useContext(LocalChangeContext);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isUpdated, setIsUpdated] = useState(false); // Flag to track user modification
    const [isInitialMount, setIsInitialMount] = useState(true); // Flag to track initial mount

    const [noteText, setNoteText] = useState(text || "");
    const textareaRef = useRef(null);
    const [position, setPosition] = useState({ x, y });
    const [isDraggingEnabled, setIsDraggingEnabled] = useState(true);
    const [size, setSize] = useState({ width, height }); 
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
        console.log(x, y);
    }, [x, y]);

    useEffect(() => {
        setSize({ width, height });
        console.log(x, y);
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
      }, [position, size, noteText, id, isUpdated, isInitialMount]);

    const handleDelete = () => {
        // API request to delete the sticky note from the server
        
        axios.delete(`${apiUrl}/api/sticky-notes/${id}`, {
                data: {projectKey: projectId }
            })
            .then(response => {
                console.log(id);
                console.log("Sticky note deleted successfully:", response.data);
            })
            .catch(error => {
                console.error("Error deleting sticky note:", error);
            });
            
    };
    const preventDefault = (event) => {
        event.preventDefault();
      };

    return (
        <Rnd

            disableDragging={!isDraggingEnabled}
            maxWidth={400}
            maxHeight={400}
            minWidth={150}
            minHeight={150}
            scale = {scale}
            position={{ x: position.x, y: position.y }}
            size={{ width: size.width,  height: size.height }}
            onDragStop={handleDragStop}
            onResizeStop={(e, direction, ref, delta, position) => {
                setSize({ width: ref.style.width, height: ref.style.height });
                setPosition(position);
                setIsUpdated(true);
            }} >

            <div className="note-container" style={{ margin: 0, height: "100%", width :"100%", backgroundColor: `${noteColour}`, border: `2px solid ${noteColour}`}}>
                <button className="delete-note" onClick={handleDelete}>×</button>
                    <textarea
                        ref={textareaRef}
                        className="note-text"
                        onClick={handleTextareaClick}
                        value={noteText}
                        onFocus={handleTextareaFocus}
                        onBlur={handleTextareaBlur}
                        onChange={handleNoteTextChange}
                        onResize={preventDefault}
                        style={{
                            fontSize: calculateFontSize(),
                            border: "none",
                            outline: "none",
                    }}></textarea>
            </div>
      </Rnd>
    );
};

// Define the default prop value for the 'text' prop
Note.defaultProps = {
    text: null, // Replace 'null' with the default value you want
};

export default Note
