import React from "react";
import "../App.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import TeamHeader from "../Components/TeamHeader/TeamHeader";
import ACTMatrix from "../Components/ACTMatrix/ACTMatrix";
import Timer from "../Components/Timer/Timer";

const TeamSession = () => {
    document.body.style.backgroundColor = "cyan";
    return (
        <div>
            <TeamHeader />
            <Sidebar />
            <ACTMatrix />
            <Timer />
        </div>
    );
};

export default TeamSession;
