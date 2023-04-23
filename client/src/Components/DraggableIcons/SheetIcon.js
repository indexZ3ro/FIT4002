import React, { useState } from 'react';
import Sheet from "../../assets/Sheet.png";

const SheetIcon = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (event) => {
    setDragging(true);
    setPosition({
      x: event.clientX - event.currentTarget.offsetLeft,
      y: event.clientY - event.currentTarget.offsetTop,
    });
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      setPosition({
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="draggable-component"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img src={ Sheet } style={{width: "72px", height: "72px"}}  alt="draggable component" />
    </div>
  );
};

export default SheetIcon;
