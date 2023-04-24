import React from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import TeamHeader from "./Components/TeamHeader/TeamHeader";
import ACTMatrix from "./Components/ACTMatrix/ACTMatrix";
import Timer from "./Components/Timer/Timer";

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
