import React from "react";
import "../css/homepage.css";
import TextButton from "../Components/Buttons/TextButton";
import stickyNote from "../assets/stickyNote.png";
import stickyNotes from "../assets/stickyNotes.png";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const routePathToCreateTeamMatrix = () => {
    navigate(`/CreateTeamMatrix`);
  }; 

  const createSoloSession = () => {
    navigate("/SoloSession");
  };

  return (
    <div className="homepage">
      <div className="left">
        <div className="homepage-split-container">
          <div className="homepage-img-container">
            <img src={stickyNote} alt="stickyNote"></img>
          </div>
          <div className="homepage-content">
            <div className="homepage-content-text">
              <h4 className="">SOLO MATRIX</h4>
              <div className="homepage-subheading">
                Create your own solo matrix or import a template...
              </div>
            </div>
            <div className="homepage-content-button">
              <TextButton
                id="create"
                customStyle={{ color: "#c8d3b8" }}
                handleClick={createSoloSession}
              ></TextButton>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="homepage-split-container">
          <div className="homepage-img-container">
            <img src={stickyNotes} alt="stickyNotes"></img>
          </div>
          <div className="homepage-content">
            <div className="homepage-content-text">
              <h4 className="">TEAM MATRIX</h4>
              <div className="homepage-subheading">
                Create your own team matrix to collaborate with team members or
                import a template...
              </div>
            </div>
            <div className="homepage-content-button">
              <TextButton
                id="create"
                handleClick={routePathToCreateTeamMatrix}
              ></TextButton>
              <TextButton
                id="join"
              ></TextButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
