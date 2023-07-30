import React from "react";
import "../../css/actSidebar.css";
import SheetIcon from "../DraggableIcons/SheetIcon";
import TextIcon from "../DraggableIcons/TextIcon";
import EditIcon from "../DraggableIcons/EditIcon";
import BluePointerIcon from "../DraggableIcons/BluePointerIcon";
import Note from "../Note/Note";

const ACTSidebar = ({ notes, setNotes }) => {

  const handleIconAdded = (x, y) => {
    setNotes([...notes, { x, y }]);
  };

  function handleRemove(index) {
    setNotes(notes.filter((_, i) => i !== index));
  }

  return (
    <div className="ACTSidebar">
      <div className="draggable-container">
        {/* Add draggable components here */}
        <div className="draggable-item sheet" onClick={() => handleIconAdded(50, 50)}>
          <SheetIcon />
        </div>

        <div className="draggable-item text">
          <TextIcon />
        </div>

        <div className="draggable-item edit">
          <EditIcon />
        </div>

        <div className="draggable-item move">
          <BluePointerIcon />
        </div>
      </div>
    </div>
  );
};

export default ACTSidebar;
