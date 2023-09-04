import React, {useState} from "react";
import "../../css/act-sidebar.css";
import SheetIcon from "../DraggableIcons/sheet_icon";
import EmojiIcon from "../DraggableIcons/emoji_icon";
import BluePointerIcon from "../DraggableIcons/blue_pointer_icon";

import Note from "../Note/Note";
import axios from "axios";
import Picker from "emoji-picker-react";
const ACTSidebar = ({ notes, setNotes }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleIconAdded = (x, y) => {
    setNotes([...notes, { x, y }]);

    // Make a POST request to create the new sticky note on the server
    axios
      .post("https://project-5389016526708021196.ts.r.appspot.com" + "/api/sticky-notes", { projectKey: '1', x, y, text: null })
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

  
  const [showPicker,setShowPicker] = useState(false);
  const [inputStr,setInputstr]= useState('');

  const onEmojiClick = (event,emojiObject) =>{

      setInputstr(prevInput => prevInput + emojiObject.emoji);
      setShowPicker(false);
  }

  return (
    <div className="ACTSidebar">
      <div className="draggable-container">
        {/* Add draggable components here */}
        <div className="draggable-item sheet" onClick={() => handleIconAdded(50, 50)}>
        <SheetIcon/>
        </div>

        <div className="draggable-item-emoji" onClick={() => setShowPicker(val => !val)}>
            <EmojiIcon/>
            <div className = "emoji-container" onClick={(e) => e.stopPropagation()}>
              {showPicker && <Picker
                pickerStyle={{
                width: '150px',
                fontSize: '12px', 
                padding: '5px' }}
                onEmojiClick={onEmojiClick} />
                
                }
              
            </div>
        </div>
        <div className="draggable-item move">
          <BluePointerIcon />
        </div>
      </div>
    </div>
  );
};

export default ACTSidebar;
