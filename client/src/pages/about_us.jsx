import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { hideSideBar } from "../features/sidebarSlice";
import team from "../assets/team.png";
const AboutUs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const home = () => {
        navigate("/Create");
    };

    useEffect(() => {
        dispatch(hideSideBar());
    });

    return (
        <div className="team-img-container">
            <img
                className="team-img"
                src={team}
                style={{ width: 100 + "vh", height: "auto" }}
            ></img>
        </div>
    );
};

export default AboutUs;
