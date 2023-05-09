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
        <div className="settingsPage-split-mid">
          <div className="settingsPage-input-wrapper">
          
            <div className="settingsPage-input-label">Name</div>
            <div className="settingsPage-input-container">
              <input
                className="settingsPage-input"
                type="text"
                placeholder="Name"
              ></input>
            </div>
            <div className="settingsPage-input-label">Email</div>
            <div className="settingsPage-input-container">
              <input
                className="settingsPage-input"
                type="text"
                placeholder="Email"
              ></input>
            </div>
            <div className="settingsPage-input-label">Password</div>
            <div className="settingsPage-input-container">
              <input
                className="settingsPage-input"
                type="text"
                placeholder="Password"
              ></input>
            </div>
            <div>
            <div className="settingsPage-button-container">
              <TextButton
                id="update"
                customStyle={{ fontSize: "12px", color: "black", backgroundColor: "#99CB81", borderColor: "#99CB81" }}
              ></TextButton>
     <TextButton
                id="update"
                customStyle={{ marginLeft: "100px",fontSize: "12px", color: "black", backgroundColor: "#FF2F22", borderColor: "#FF2F22" }}
              ></TextButton>
            
              </div>
            </div>
           </div>
        </div>
    
        <div className="settingsPage-split-right">
          <div className="settingsPage-box-white">
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
