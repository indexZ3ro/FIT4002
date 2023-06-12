import React, { useState, useEffect, useRef } from 'react';
import "../../css/TeamHeader.css";


const TeamHeader = () => {
    const [name, setName] = useState("Name");
    const divRef = useRef();
  
    useEffect(() => {
      divRef.current.textContent = name;
    }, [name]);
  
    const handleInput = (e) => {
      setName(e.target.textContent);
    }

    return (
        <div className="team-header-container">
            <div ref={divRef} className="team-header" contentEditable={true} onInput={handleInput} />
        </div>
    )
};

export default TeamHeader;
