import React from "react";
import "../../css/ACTSidebar.css";
import SheetIcon from "../DraggableIcons/SheetIcon";
import TextIcon from "../DraggableIcons/TextIcon";
import EditIcon from "../DraggableIcons/EditIcon";
import BluePointerIcon from "../DraggableIcons/BluePointerIcon";
import Note from "../Note/Note";

const ACTSidebar = () => {
  const [showNotes, setShowNotes] = React.useState([]);

  function handleClick() {
    setShowNotes([...showNotes, {}]);
  }

  function handleRemove(index) {
    setShowNotes(showNotes.filter((_, i) => i !== index));
  }

  return (
    <div className="ACTSidebar">
      <div className="draggable-container">
        {/* Add draggable components here */}
        <div className="draggable-item sheet" onClick={handleClick}>
          <SheetIcon />
        </div>

        {/* Create Notes*/}
        {showNotes.map((_, index) => (
          <Note key={index} onRemove={() => handleRemove(index)} />
        ))}

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
