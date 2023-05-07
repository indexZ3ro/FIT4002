import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/signUpPage.css";
import "../css/SettingsPage.css";
import TextButton from "../Components/Buttons/TextButton";

import { CgProfile } from "react-icons/cg";

const SettingsPage = () => {

  return (
    <div className="settingsPage">
      <div className="settingsPage-top">
      <div className="settingsPage-box">  </div>
          <div className="settingsPage-title">Account Settings</div>
       
        </div>
      <div className="settingsPage-mid">
        <div className="settingsPage-split-left">
          <div className="settingsPage-input-wrapper">
            <div className="settingsPage-input-label">hbjbjb</div>
            <div className="settingsPage-input-container">
              <input
                className="settingsPage-input"
                type="text"
                placeholder="Team Name"
              ></input>
            </div>
            <div className="settingsPage-input-container">
              <input
                className="settingsPage-input"
                type="text"
                placeholder="Timer"
              ></input>
            </div>
            <div className="settingsPage-input-container">
              <TextButton
                id="start"
                customStyle={{ color: "#22A7FF" }}
              ></TextButton>
            </div>
          </div>
        </div>
        <div className="settingsPage-split-right">
         
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
