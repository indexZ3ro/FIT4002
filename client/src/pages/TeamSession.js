import React, { useState } from "react";
import "../App.css";
import "../css/TeamSession.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import TeamHeader from "../Components/TeamHeader/TeamHeader";
import ACTMatrix from "../Components/ACTMatrix/ACTMatrix";
import Timer from "../Components/Timer/Timer";
import ACTSidebar from "../Components/ACTSidebar/ACTSidebar";

const TeamSession = () => {
  // handle sticky notes state management here
  const [notes, setNotes] = useState([]);

  return (
    <div className="TeamSession">
      <TeamHeader />
      <Sidebar />
      <ACTMatrix notes={notes}/>
      {/* <Timer /> */}
      <ACTSidebar notes={notes} setNotes={setNotes}/>
    </div>
  );
};

export default TeamSession;
