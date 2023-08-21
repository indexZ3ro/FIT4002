import React from "react";
import "../../css/act-sidebar.css";
import SheetIcon from "../DraggableIcons/sheet_icon";
import EmojiIcon from "../DraggableIcons/emoji_icon";
import BluePointerIcon from "../DraggableIcons/blue_pointer_icon";

import Note from "../Note/Note";
import axios from "axios";

const ACTSidebar = ({ notes, setNotes }) => {
  const apiUrl = "http://localhost:8080";

  const handleIconAdded = (x, y) => {
    setNotes([...notes, { x, y }]);

    // Make a POST request to create the new sticky note on the server
    axios
      .post(apiUrl + "/api/sticky-notes", { projectKey: '1', x, y, text: null })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error creating sticky note:", error);
      });
  };

  function handleRemove(index) {
    setNotes(notes.filter((_, i) => i !== index));
  }

  return (
    <div className="ACTSidebar">
      <div className="draggable-container">
        {/* Add draggable components here */}
        <div className="draggable-item sheet" onClick={() => handleIconAdded(50, 50)}>
        <SheetIcon/>
        </div>

        <div className="draggable-item edit">
          <EmojiIcon />
        </div>

        <div className="draggable-item move">
          <BluePointerIcon />
        </div>
      </div>
    </div>
  );
};

export default ACTSidebar;
