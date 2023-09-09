import React from "react";
import "../../css/act-sidebar.css";
import SheetIcon from "../DraggableIcons/sheet_icon";
import EmojiIcon from "../DraggableIcons/emoji_icon";
import BluePointerIcon from "../DraggableIcons/blue_pointer_icon";

import Note from "../Note/Note";
import axios from "axios";

const ACTSidebar = ({ notes, setNotes, projectId }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleIconAdded = (x, y) => {
    setNotes([...notes, { x, y }]);

    // Make a POST request to create the new sticky note on the server
    axios
      .post(apiUrl + "/api/sticky-notes", { projectKey: projectId, x, y, text: null })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
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
