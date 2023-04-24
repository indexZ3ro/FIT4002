import React from "react";
import "./ACTMatrix.css";

const ACTMatrix = () => {
    return (
        <div className="container">
            <div>
                <div className="line-y"></div>
                <div className="line-x"></div>
            </div>
            <div className="text-inside">Inside</div>
            <div className="text-outside">Outside</div>
            <div className="text-towards">Towards</div>
            <div className="text-away">Away</div>
        </div>
    );
};

export default ACTMatrix;
