import React, {useEffect} from "react";
import "../../css/act-matrix.css";
import Note from "../Note/Note.js";

const ACTMatrix = ({ notes, setNotes }) => {
    return (
        <div className="ACTMatrix">
            <div>
                <div className="line-y"></div>
                <div className="line-x"></div>
            </div>
            {/* <div className="text-inside">Inside</div>
            <div className="text-outside">Outside</div>
            <div className="text-towards">Towards</div>
            <div className="text-away">Away</div> */}

            {/* stickynotes */}
            {notes.map((note) => (
                <Note id={note.id} x={note.x} y={note.y} text={note.text} />
            ))}
        </div>
    );
};

export default ACTMatrix;
