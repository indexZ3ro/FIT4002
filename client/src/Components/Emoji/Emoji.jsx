import React, { useState, useRef, useEffect, useContext} from "react";
import "../../css/act-sidebar.css";
import Draggable from "react-draggable";
import axios from "axios";
import LocalChangeContext from "../../contexts/LocalChangeContext";
import {Rnd} from "react-rnd";
import useHistoryState from "../HistoryProvider";


const Emoji = ({id,x,y,width = 75, height= 75,scale,url,projectId}) => {
  const { localChanges, setLocalChanges } = useContext(LocalChangeContext);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isUpdated, setIsUpdated] = useState(false); // Flag to track user modification
  const [isInitialMount, setIsInitialMount] = useState(true); // Flag to track initial mount

  const [Emojiurl, setEmojiURL] = useState(url || "");
  const [position, setPosition,undoPosition] = useHistoryState({ x, y });
  const [size, setSize,undoSize] = useHistoryState({ width, height }); 

  const [isHovered, setIsHovered] = useState(false);
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(true);

  const handleDragStop = (e, ui) => {
    setPosition({ x: ui.lastX, y: ui.lastY });
    setIsUpdated(true);
  };

  useEffect(() => {
      setPosition({ x, y });
      console.log(x, y);
  }, [x, y]);

  useEffect(() => {
    setEmojiURL(url || "");
  }, [url]);

  useEffect(() => {
    setSize({ width, height });
    console.log(x, y);
}, [width, height]);

useEffect(() => {
  const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'z') {
     
          undoPosition();
          undoSize();
          setIsUpdated(true);
      }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [undoPosition, undoSize]);

  useEffect(()=> {
       // Make the axios request to update the emoji  on the server
       if (!isInitialMount && isUpdated) {
        console.log({id})
        axios
        .put(apiUrl + `/api/emoji/${id}`, {
            projectKey: projectId,
            x: position.x,
            y: position.y,
            width: size.width,
            height: size.height,
            url: Emojiurl,
        })
        .then((response) => {
            console.log("Emoji updated successfully:", response.data);
            setIsUpdated(false); // Reset the isUpdated flag after the update
        })
        .catch((error) => {
            console.error("Error updating emoji:", error);
        });
    } else {
        // Set the flag to false after the component has mounted
        setIsInitialMount(false);
      }
  }, [position,size, Emojiurl, id, isUpdated, isInitialMount]);

  const handleDelete = () => {
    // API request to delete the emoji from the server
    axios.delete(`${apiUrl}/api/emoji/${id}`, {
            data: {projectKey: projectId }
        })
        .then(response => {
            console.log(id);
            console.log("Emoji deleted successfully:", response.data);
        })
        .catch(error => {
            console.error("Error deleting sticky note:", error);
        });
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  


  return (
    <Rnd    disableDragging={!isDraggingEnabled}
            maxWidth={170}
            maxHeight={170}
            minWidth={70}
            minHeight={70}
            scale = {scale}
            position={{ x: position.x, y: position.y }}
            size={{ width: size.width,  height: size.height }}
            onDragStop={handleDragStop}
            onResizeStop={(e, direction, ref, delta, position) => {
                setSize({ width: ref.style.width, height: ref.style.height });
                setPosition(position);
                setIsUpdated(true);
            }} >
    <div
      className="emoji-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <button onClick = {handleDelete} className="delete-button-emoji" >
          X
        </button>
      )}
      <img src={url} alt="Emoji"   style={{ width: '100%', height: '100%' }}   // Added this style
             />
    </div>
    </Rnd>
  );
};

export default Emoji;