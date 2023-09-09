import React, { useEffect, useState, useRef } from "react";
import "../../css/act-matrix.css";
import Note from "../Note/Note.js";
import ACT from "../../assets/ACT.svg";

const ACTMatrix = ({ notes, setNotes }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastMousePosition, setLastMousePosition] = useState(null);
  const canvasRef = useRef(null);

  const handleWheel = (e) => {
    e.preventDefault();
    let newScale = scale + e.deltaY * -0.001;
    newScale = Math.min(Math.max(0.125, newScale), 4);
    setScale(newScale);
  };

  const handleMouseDown = (e) => {
    if (e.button === 1) {
      e.preventDefault();
      setIsDragging(true);
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = (e) => {
    if (e.button === 1) {
      setIsDragging(false);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = (e.clientX - lastMousePosition.x) / scale;
      const dy = (e.clientY - lastMousePosition.y) / scale;
      setPosition({ x: position.x + dx, y: position.y + dy });
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const x = position.x * scale;
      const y = position.y * scale;
      canvasRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    }
  }, [position, scale]);

  return (
    <div
      className={`outer-infinite ${isDragging ? "grabbing" : ""}`}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div
        className={`infiniteCanvas ${isDragging ? "grabbing" : ""}`}
        ref={canvasRef}
      >
        <img className="actImage" src={ACT}></img>
        {/* <div style={negativeLineYStyle} className="line-y"></div>
                <div style={positiveLineXStyle} className="line-x"></div>
                <div style={positiveLineYStyle} className="line-y"></div>
                <div style={negativeLineXStyle} className="line-x"></div> */}
        {/* stickynotes */}
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            x={note.x}
            y={note.y}
            text={note.text}
            scale={scale}
          />
        ))}
      </div>
    </div>
  );
};

export default ACTMatrix;
