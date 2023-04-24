import React from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import TeamHeader from "./Components/TeamHeader";
import ACTMatrix from "./Components/ACTMatrix";
import Timer from "./Components/Timer";

const SoloSession = () => {
    document.body.style.backgroundColor = "orange";
    return (
        <div>
            <TeamHeader />
            <Sidebar />
            <ACTMatrix />
            <Timer />
        </div>
    );
};

export default SoloSession;
