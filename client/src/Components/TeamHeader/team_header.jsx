import React, { useState, useEffect, useRef } from "react";
import "../../css/team-header.css";
import Line from "../../assets/Line.svg";

import { useParams } from "react-router-dom";
import { ref, child, get, push, set, getDatabase, update } from "firebase/database";
import { realtimeDb } from "../../firebase";


const TeamHeader = ({ accessCode }) => {
  const [projectName, setName] = useState("");
  const { projectId } = useParams();
  const [cache, setCache] = useState();

  const handleInput = (e) => {
    setName(e.target.value);
    // console.log(e);
  };

  const handleBlur = (e) => {
    console.log(projectName);
    const projectRef = ref(realtimeDb, "Projects/" + projectId);
    update(projectRef, { name: projectName })
      .then(() => {
        // Data saved successfully!
      })
      .catch((error) => {
        console.log(error);
        // The write failed...
      });
  };

  // get the project name from database directly !!!
  useEffect(() => {
    const dbRef = ref(realtimeDb);
    get(child(dbRef, `Projects/${projectId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          setName(snapshot.val().name);
          setCache(snapshot.val());
          console.log(cache.name);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="wrapContainer">
      <div className="teamHeader">Teamoji</div>
      <img src={Line}></img>

      <input
        type="text"
        value={projectName}
        className="teamName"
        placeholder="Team Name"
        onChange={handleInput}
        onBlur={handleBlur}
      ></input>
      <div>{accessCode}</div>
    </div>
  );
};

export default TeamHeader;
