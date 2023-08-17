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
        <div className="container">
            <img src={settingsIcon} alt="Settings Icon" />
            <div className="header">
                <h4>Teamoji</h4>
            </div>
            <div className="title">
                <h2>Settings</h2>
            </div>
            <div className="form">
                <form>
                    <label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                        ></input>
                    </label>
                    <label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                        ></input>
                    </label>
                    <label>
                        <input
                            type="text"
                            name="password"
                            placeholder="Password"
                        ></input>
                    </label>
                    <button
                        type="update"
                        value="Update"
                        className="update"
                        onClick={update()}
                    >
                        Update
                    </button>
                    <button
                        type="delete"
                        value="Delete"
                        className="delete"
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
