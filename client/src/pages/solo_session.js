import React from "react";
import "../App.css";
import "../css/solo-session.css";
import Sidebar from "../Components/Sidebar/sidebar";
import TeamHeader from "../Components/TeamHeader/team_header";
import ACTMatrix from "../Components/ACTMatrix/act_matrix";
import Timer from "../Components/Timer/timer";
import ACTSidebar from "../Components/ACTSidebar/act-sidebar";

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
