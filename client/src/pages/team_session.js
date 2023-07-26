import React from "react";
import "../App.css";
import "../css/team-session.css";
import Sidebar from "../Components/Sidebar/sidebar";
import TeamHeader from "../Components/TeamHeader/team_header";
import ACTMatrix from "../Components/ACTMatrix/act_matrix";
import Timer from "../Components/Timer/timer";
import ACTSidebar from "../Components/ACTSidebar/act-sidebar";

const TeamSession = () => {
  return (
    <div className="TeamSession">
      <TeamHeader />
      <Sidebar />
      <ACTMatrix />
      <Timer />
      <ACTSidebar />
    </div>
  );
};

export default TeamSession;
