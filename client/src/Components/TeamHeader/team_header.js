import React, { useState, useEffect, useRef } from "react";
import "../../css/team-header.css";
import Line from "../../assets/Line.svg";

const TeamHeader = ( {accessCode} ) => {
  const [name, setName] = useState("");

  const handleInput = (e) => {
    setName(e.target.value);
    console.log(e);
  };

  const handleBlur = (e) => {
    sessionStorage.setItem("teamName", name);
  };

  useEffect(() => {
    // change to API get when it is working
    const getTeamName = sessionStorage.getItem("teamName");
    if (getTeamName) {
      setName(getTeamName);
      console.log("get success");
    }
  }, []);

  return (
    <div className="wrapContainer">
      <div className="teamHeader">Teamoji</div>
      <img src={Line}></img>

      <input
        type="text"
        value={name}
        className="teamName"
        placeholder="Team Name"
        onChange={handleInput}
        onBlur={handleBlur}
      ></input>
      <div>
        {accessCode}
      </div>
    </div>
    
  );
};

export default TeamHeader;
