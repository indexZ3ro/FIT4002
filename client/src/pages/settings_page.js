import React from "react";
import "../css/settings.css";
import settingsIcon from "../assets/settings-icon.png";
import TextButton from "../Components/Buttons/textButton";

const Settings = () => {
    const update = () => {
        // TO DO
    };

    const deleteAcc = () => {
        // TO DO
    };

   return (
    <div className="settings-page">
        <div className="split-left-settings">
           
            <img className="settingsPageCoverImg" src={settingsIcon}></img>
        </div>

        <div className="split-right-settings">
            <div className="settings-container">
                <div className="settings-Title">Settings</div>
                    <div className="input-container-settings">
                        <input
                            className="userInput"
                            placeholder="Name"
                            type="text"
                        ></input>
                        <input
                            className="userInput"
                            placeholder="Email"
                            type="text"
                        ></input>
                        <input
                            className="userInput"
                            type={"password"}
                            name="password"
                            placeholder="Password"
                        ></input>
                     </div>
             <div>
                <TextButton
                    id="update"
                    customStyle={{
                        width: "15vw",
                        height: "5vh",
                        backgroundColor: "rgba(200, 150, 249, 0.3)",
                        borderColor: "rgba(200, 150, 249, 0.3)",
                    }}
                    handleClick={update}
                />
                <TextButton
                    id="Delete Account"
                    customStyle={{
                        width: "15vw",
                        height: "5vh",
                        backgroundColor: "rgba(255, 47, 34, 0.3)",
                        borderColor: "rgba(200, 150, 249, 0.3)",
                    }}
                    handleClick={deleteAcc}
                />
                </div>
            </div>
        </div>
    </div>
   );
};
export default Settings;
