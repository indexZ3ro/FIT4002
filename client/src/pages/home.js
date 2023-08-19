import React, { useEffect } from "react";
import "../css/homepage.css";
import TextButton from "../Components/Buttons/text_button";
import stickyNote from "../assets/StickyNoteIcon.png";
import stickyNotes from "../assets/StickyNotesMultiple.png";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSideBar } from "../features/sidebarSlice";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const routePathToCreateTeamMatrix = () => {
    navigate("/CreateTeamMatrix");
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
            <img src={stickyNote} alt="stickyNote" />
          </div>
          <div className="homepage-content">
            <div className="homepage-content-text">
              <h className="homepage-heading">Solo Matrix</h>
              <div className="homepage-subheading">
                Create your own solo matrix or import a template...
              </div>
            </div>
            <div className="homepage-content-button">
              <TextButton
                id="create"
                customStyle={{
                  backgroundColor: "rgba(200, 150, 249, 0.3)",
                  borderColor: "rgba(200, 150, 249, 0.3)",
                }}
                handleClick={createSoloSession}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="vertical-line"></div>
      <div className="right">
        <div className="homepage-split-container">
          <div className="homepage-img-container">
            <img src={stickyNotes} alt="stickyNotes" />
          </div>
          <div className="homepage-content">
            <div className="homepage-content-text">
              <h className="homepage-heading">Team Matrix</h>
              <div className="homepage-subheading">
                Create your own team matrix to collaborate with team members or
                import a template...
              </div>
            </div>
            <div className="homepage-content-button">
              <TextButton
                id="create"
                customStyle={{
                  backgroundColor: "rgba(200, 150, 249, 0.3)",
                  borderColor: "rgba(200, 150, 249, 0.3)",
                }}
                handleClick={routePathToCreateTeamMatrix}
              />
              <TextButton
                id="join"
                customStyle={{
                  backgroundColor: "rgba(152, 159, 206, 0.3)",
                  borderColor: "rgba(152, 159, 206, 0.3)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
