import React, { useState, useRef, useEffect, useContext} from "react";
import "../../css/act-sidebar.css";
import Draggable from "react-draggable";
import axios from "axios";
import LocalChangeContext from "../../contexts/LocalChangeContext";
const Emoji = ({id,x,y,url}) => {
  const { localChanges, setLocalChanges } = useContext(LocalChangeContext);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isUpdated, setIsUpdated] = useState(false); // Flag to track user modification
  const [isInitialMount, setIsInitialMount] = useState(true); // Flag to track initial mount

  const [Emojiurl, setEmojiURL] = useState(url || "");
  const [position, setPosition] = useState({ x, y });
  const [isHovered, setIsHovered] = useState(false);

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

  useEffect(()=> {
       // Make the axios request to update the emoji  on the server
       if (!isInitialMount && isUpdated) {
        console.log({id})
        axios
        .put(apiUrl + `/api/emoji/${id}`, {
            projectKey: 1,
            x: position.x,
            y: position.y,
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
  }, [position, Emojiurl, id, isUpdated, isInitialMount]);

  const handleDelete = () => {
    // API request to delete the emoji from the server
    axios.delete(`${apiUrl}/api/emoji/${id}`, {
            data: {projectKey: 1 }
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
    <Draggable onStop={handleDragStop} position={{ x: position.x, y: position.y }}>
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
      <img value={url} src={url} alt="Emoji" />
    </div>
  </Draggable>
  );
};

export default Emoji;