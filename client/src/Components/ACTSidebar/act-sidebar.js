import React from "react";
import "../../css/act-sidebar.css";
import SheetIcon from "../DraggableIcons/sheet_icon";
import TextIcon from "../DraggableIcons/text_icon";
import EditIcon from "../DraggableIcons/edit_icon";
import BluePointerIcon from "../DraggableIcons/blue_poiner_icon";
import Note from "../Note/note";

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
