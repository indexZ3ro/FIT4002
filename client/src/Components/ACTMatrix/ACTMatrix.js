import React from "react";
import "../../css/ACTMatrix.css";
import Note from "../Note/Note.js";

const ACTMatrix = ({ notes }) => {
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
            {notes.map((icon, index) => (
                <Note key={index} x={icon.x} y={icon.y} />
            ))}
        </div>
    );
};

export default ACTMatrix;
