import React from "react";
import "../../css/ACTMatrix.css";

const ACTMatrix = () => {
    const quad1 = document.querySelector(".quad1");
    const quad2 = document.querySelector(".quad2");
    const quad3 = document.querySelector(".quad3");
    const quad4 = document.querySelector(".quad4");

    const handleClick1 = () => {
        quad1.classList.toggle("expanded");
        quad2.classList.toggle("hidden");
        quad3.classList.toggle("hidden");
        quad4.classList.toggle("hidden");
    };
    const handleClick2 = () => {
        const quad1 = document.querySelector(".quad1");
        const quad2 = document.querySelector(".quad2");
        const quad3 = document.querySelector(".quad3");
        const quad4 = document.querySelector(".quad4");
        quad1.classList.toggle("hidden");
        quad2.classList.toggle("expanded");
        quad3.classList.toggle("hidden");
        quad4.classList.toggle("hidden");
    };
    const handleClick3 = () => {
        const quad1 = document.querySelector(".quad1");
        const quad2 = document.querySelector(".quad2");
        const quad3 = document.querySelector(".quad3");
        const quad4 = document.querySelector(".quad4");
        quad1.classList.toggle("hidden");
        quad2.classList.toggle("hidden");
        quad3.classList.toggle("expanded");
        quad4.classList.toggle("hidden");
    };
    const handleClick4 = () => {
        const quad1 = document.querySelector(".quad1");
        const quad2 = document.querySelector(".quad2");
        const quad3 = document.querySelector(".quad3");
        const quad4 = document.querySelector(".quad4");
        quad1.classList.toggle("hidden");
        quad2.classList.toggle("hidden");
        quad3.classList.toggle("hidden");
        quad4.classList.toggle("expanded");
    };

    return (
        <div className="container">
            <div className="inner-container quad1" onClick={handleClick1}></div>
            <div className="inner-container quad2" onClick={handleClick2}></div>
            <div className="inner-container quad3" onClick={handleClick3}></div>
            <div className="inner-container quad4" onClick={handleClick4}></div>
            <div className="text-inside">Inside</div>
            <div className="text-outside">Outside</div>
            <div className="text-towards">Towards</div>
            <div className="text-away">Away</div>
        </div>
    );
};

export default ACTMatrix;
