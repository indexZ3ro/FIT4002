import React, { useEffect } from "react";
import "../css/homepage.css";
import TextButton from "../Components/Buttons/TextButton";
import stickyNote from "../assets/stickyNote.png";
import stickyNotes from "../assets/stickyNotes.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSideBar } from "../features/sideBarSlice";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const routePathToCreateTeamMatrix = () => {
    navigate(`/CreateTeamMatrix`);
  };

  const createSoloSession = () => {
    navigate("/SoloSession");
  };

  useEffect(() => {
    dispatch(showSideBar());
  });

  return (
    <div className="homepage">
      <div className="left">
        <div className="homepage-split-container">
          <div className="homepage-img-container">
            <img src={stickyNote} alt="stickyNote"></img>
          </div>
          <div className="homepage-content">
            <div className="homepage-content-text">
              <h4 className="homepage-heading" >Solo Matrix</h4>
              <div className="homepage-subheading">
                Create your own solo matrix or import a template...
              </div>
            </div>
            <div className="homepage-content-button">
              <TextButton
                id="create"
                customStyle={{ background: "#C896F9" }}
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
              <h4 className="homepage-heading" >Team Matrix</h4>
              <div className="homepage-subheading">
                Create your own team matrix to collaborate with team members or
                import a template...
              </div>
            </div>
            <div className="homepage-content-button">
              <TextButton
                id="create"
                customStyle={{color: "#C896F9"}}
                handleClick={routePathToCreateTeamMatrix}
              ></TextButton>
              <TextButton id="join"
              customStyle={{color: "#989FCE"}}></TextButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
