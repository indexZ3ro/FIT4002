import React from "react";
import "../css/homepage.css";
import TextButton from "../Components/Buttons/TextButton";
import stickyNote from "../assets/stickyNote.png";
import stickyNotes from "../assets/stickyNotes.png";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="homepage-title">Teamoji</div>
      <div className="left">
        <div className="homepage-split-container">
          <div className="homepage-img-container">
            <img src={stickyNote} alt="stickyNote"></img>
          </div>
          <div className="homepage-content">
            <div className="homepage-content-text">
              <div className="homepage-heading">SOLO MATRIX</div>
              <div className="homepage-subheading">
                Create your own solo matrix or import a template...
              </div>
            </div>
            <div className="homepage-content-button">
              <TextButton id="create"></TextButton>
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
              <div className="homepage-heading">TEAM MATRIX</div>
              <div className="homepage-subheading">
                Create your own team matrix to collaborate with team members or
                import a template...
              </div>
            </div>
            <div className="homepage-content-button">
              <TextButton id="create"></TextButton>
              <TextButton id="join"></TextButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
