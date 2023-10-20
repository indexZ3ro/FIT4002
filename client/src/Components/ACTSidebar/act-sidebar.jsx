import React, {useContext,useState,useEffect} from "react";
import "../../css/act-sidebar.css";
import SheetIcon from "../DraggableIcons/sheet_icon";
import EmojiIcon from "../DraggableIcons/emoji_icon";
import BluePointerIcon from "../DraggableIcons/blue_pointer_icon";
import ScaleContext from "../../contexts/scaleContext";
import Note from "../Note/Note";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import Emoji from "../Emoji/Emoji";

const ACTSidebar = ({ notes, setNotes, projectId, emojis, setEmojis, noteColour}) => {
  const [scale]= useContext(ScaleContext);
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleIconAdded = (x, y) => {
    
    setNotes([...notes, { x, y }]);

    // Make a POST request to create the new sticky note on the server
    axios
      .post(apiUrl + "/api/sticky-notes", { projectKey: projectId, x, y, text: null, height:150,width:150, noteColour })
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
  function handleRemoveEmoji(index) {
    setEmojis(emojis.filter((_, i) => i !== index));
  }

  
  const [showPicker,setShowPicker] = useState(false);
  const [currentEmoji,setCurrentEmoji] = useState(null)
  const [isDragging, setIsDragging] = useState(false);
  const [draggingPosition, setDraggingPosition] = useState({x: 0, y: 0});
  const [initialPosition, setInitialPosition] = useState({x: 0, y: 0});
  const [isDraggingEmoji, setIsDraggingEmoji] = useState(false);
  const [emojiURL, setEmojiURL] = useState('');

  const startDragging = (e) => {
    if(!isDragging) {  // Added condition to start dragging only if not already dragging
      setIsDragging(true);
      setInitialPosition({x: e.clientX, y: e.clientY});
      setDraggingPosition({x: e.clientX, y: e.clientY});
      e.stopPropagation();  // Stop event propagation to prevent undesired behaviors
    }
  };

  const startDraggingEmoji = (e) => {
    if (!isDraggingEmoji) {
      setIsDraggingEmoji(true);
      setInitialPosition({ x: e.clientX, y: e.clientY });
      setDraggingPosition({ x: e.clientX, y: e.clientY });
      e.stopPropagation();
    }
  };
  const onDragging = (e) => {
    if (isDragging || isDraggingEmoji) {
      setDraggingPosition({ x: e.clientX, y: e.clientY });
    }
  };
  

  const placeNote = (e) => {
    if (isDragging || isDraggingEmoji) {
    
    const canvas = document.getElementById('infiniteCanvas');
    const rect = canvas.getBoundingClientRect();
    console.log("rect",rect.left)
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

      const distanceMoved = Math.sqrt(
        Math.pow(draggingPosition.x - initialPosition.x, 2) +
        Math.pow(draggingPosition.y - initialPosition.y, 2)
      );
    if (distanceMoved > 5) {
          setIsDragging(false);
          setIsDraggingEmoji(false);
          if (isDragging) {
            handleIconAdded(x, y);
          } else if (isDraggingEmoji) {
            // Make a POST request to create the new emoji on the server
            axios
            .post(apiUrl + "/api/emoji", { projectKey: projectId, x, y, url: emojiURL, height:70,width:70  })
            .then((response) => {
              console.log(response.data);
              setEmojis([...emojis, { x, y , emojiURL,height,width,id:response.data.id}]);
            })
            .catch((error) => {
              console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
              console.error("Error creating emoji note:", error);
          });
          }
        }
      }
    };

  useEffect(() => {
    window.addEventListener('mousemove', onDragging);
    window.addEventListener('mouseup', placeNote);  // keep the global mouseup event to finalize the note
    
    return () => {
      window.removeEventListener('mousemove', onDragging);
      window.removeEventListener('mouseup', placeNote);
    };
  }, [isDragging, onDragging, placeNote]);  // removed startDragging from dependencies


  const onEmojiClick = (event,emojiObject) =>{
    const url = emojiObject.srcElement.getAttribute("src")
    setEmojiURL(url); // Update the state
    setShowPicker(false);
      // Calculate the position of the EmojiPicker
    const pickerElement = document.querySelector('.emoji-container-picker');
    const rect = pickerElement.getBoundingClientRect();
    const x = rect.left
    const y = rect.top
    // Start dragging the selected emoji
    setIsDraggingEmoji(true);
    setDraggingPosition({ x: rect.left, y: rect.top }); // set initial position to the EmojiPicker's position
    setCurrentEmoji(url); // set the current emoji to the selected one

  }

 
  return (

      <div className="ACTSidebar">
        <div className="draggable-container">
      
          {/* Add draggable components here */}
          <div className="draggable-item sheet" onMouseDown={startDragging}>
          <SheetIcon/>
          </div>
          {isDragging && (
          <div 
          style={{
            position: 'fixed',  // Changed to 'fixed' to ensure the note is positioned relative to the viewport
            top: draggingPosition.y -75 ,  // Adjusted the offset as needed
            left: draggingPosition.x -75 ,  // Adjusted the offset as needed
            pointerEvents: 'none',
            opacity: 0.7  // Optional: making it semi-transparent to indicate this is a "ghost" element
        }}
          >
            <Note x={0} y={0} /* Other required props */ />
          </div>
        )}
          {isDraggingEmoji && (  // Add this part
          <div 
            style={{
              position: 'fixed',
              top: draggingPosition.y - 35,
              left: draggingPosition.x - 35,
              pointerEvents: 'none',
              opacity: 0.7
            }}
          >
            <img src={currentEmoji} alt="ghost emoji" style={{ width: '70px', height: '70px' }} />
          </div>
        )}
          <div className="draggable-item-emoji" onClick={() => setShowPicker(val => !val)}>
              <EmojiIcon/>
              <div className = "emoji-container-picker" onClick={(e) => {e.stopPropagation();}}>
                {showPicker && <EmojiPicker
                  pickerStyle={{
                  width: '150px',
                  fontSize: '12px', 
                  padding: '5px' }}
                  onEmojiClick={onEmojiClick}/>
                  }
                
              </div>
          </div>
          <div className="draggable-item move">
            <BluePointerIcon></BluePointerIcon>
          </div>
          
        </div>
      </div>

  );
};

export default ACTSidebar;

