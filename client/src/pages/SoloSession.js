import React from "react";
import "../App.css";
import "../css/SoloSession.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import TeamHeader from "../Components/TeamHeader/TeamHeader";
import ACTMatrix from "../Components/ACTMatrix/ACTMatrix";
import Timer from "../Components/Timer/Timer";
import ACTSidebar from "../Components/ACTSidebar/ACTSidebar";

const SoloSession = () => {
  return (
    <div className="SoloSession">
      <TeamHeader />
      <Sidebar />
      <ACTMatrix />
      <Timer />
      <ACTSidebar />
    </div>
  );
};

export default SoloSession;
