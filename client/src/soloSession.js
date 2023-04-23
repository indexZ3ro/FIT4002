import React from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import TeamHeader from "./Components/TeamHeader";
import ACTMatrix from "./Components/ACTMatrix";

const SoloSession = () => {
    document.body.style.backgroundColor = "orange";
    return (
        <div>
            <TeamHeader />
            <Sidebar />
            <ACTMatrix />
        </div>
    );
};

export default SoloSession;
