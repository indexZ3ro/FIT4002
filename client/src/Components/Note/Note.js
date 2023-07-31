import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

const Note = ({ x, y, id, text }) => {

    const [noteText, setNoteText] = useState(text || "");
    const textareaRef = useRef(null);
    const [position, setPosition] = useState({ x, y });

    const handleNoteTextChange = (e) => {
        setNoteText(e.target.value);
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
        const fontSize =
            maxFontSize - (textLength * (maxFontSize - minFontSize)) / 50;
        return `${fontSize}px`;
    };

    return (
        <Draggable>
            <div
                className="note-container"
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            >
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

export default Note;
