import React from "react";
import "../css/settings.css";
import settingsIcon from "../assets/settings-icon.png";

const Settings = () => {
    const update = () => {
        // TO DO
    };

    const deleteAcc = () => {
        // TO DO
    };

    return (
        <div className="settings-container">
            <img className="settings-img" src={settingsIcon} alt="Settings Icon" />
            <div className="settings-header">
                <h4 className="settings-h4">Teamoji</h4>
            </div>
            <div className="settings-title">
                <h2 className="settings-h2">Settings</h2>
            </div>
            <div className="settings-form">
                <form>
                    <label>
                        <input
                            className="settings-input"
                            type="text"
                            name="name"
                            placeholder="Name"
                        ></input>
                    </label>
                    <label>
                        <input
                            className="settings-input"
                            type="text"
                            name="email"
                            placeholder="Email"
                        ></input>
                    </label>
                    <label>
                        <input
                            className="settings-input"
                            type="text"
                            name="password"
                            placeholder="Password"
                        ></input>
                    </label>
                    <button
                        type="update"
                        value="Update"
                        className="settings-button update"
                        onClick={update()}
                    >
                        Update
                    </button>
                    <button
                        type="delete"
                        value="Delete"
                        className="settings-button delete"
                        onClick={deleteAcc()}
                    >
                        Delete Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
