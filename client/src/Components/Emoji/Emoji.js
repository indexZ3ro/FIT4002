import React from "react";
import "../../css/act-sidebar.css";
import Draggable from "react-draggable";
const Emoji = ({x,y,url}) => {

  return (
    
       <Draggable >
          <div>
          <img  src={url} alt="Emoji" />
          </div>          
        </Draggable>
  );
};

export default Emoji;