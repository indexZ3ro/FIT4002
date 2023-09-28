import React, { useState } from "react";
import "../../css/modal.css";
import TextButton from "../Buttons/textButton";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Modal = ({ handleClose, show, create, userID, userName }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState("");
    const [accessCode, setAccessCode] = useState("");

    const routePathToCreateTeamMatrix = () => {
        const teamDetails = {
            projectName: projectName,
            userID: userID,
            userName: userName,
        };
        axios
            .post(apiUrl + "/api/createProject", teamDetails)
            .then((response) => {
                const projectKey = response.data.projectKey;
                // Navigate to TeamSession with projectID as parameter
                navigate(`/ACTMatrixSession/${projectKey}`);
            })
            .catch((error) => {
                console.error("Error creating project:", error);
            });
    };

    const joinTeamMatrix = () => {
        const joinDetails = {
            userID: userID,
            accessCode: accessCode,
        };

        axios
            .post(apiUrl + "/api/joinMatrix", joinDetails)
            .then((response) => {
                const responseStatus = response.data.status;
                if (responseStatus) {
                    const responseKey = response.data.projectKey;
                    console.log(responseKey);
                    navigate(`/ACTMatrixSession/${responseKey}`);
                } else {
                    console.log("fail");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return create ? (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="modal-close" onClick={handleClose}>
                    <AiOutlineClose />
                </div>
                <div className="modal-title">Create Team Matrix</div>
                <div className="modal-input-container">
                    <input
                        className="userInput"
                        placeholder="Project Name"
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    ></input>
                    <input
                        className="userInput"
                        type={"number"}
                        placeholder="Timer"
                    ></input>
                    <TextButton
                        id="create"
                        customStyle={{
                            backgroundColor: "rgba(200, 150, 249, 0.3)",
                            borderColor: "rgba(200, 150, 249, 0.3)",
                        }}
                        handleClick={routePathToCreateTeamMatrix}
                    />
                </div>
            </section>
        </div>
    ) : (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="modal-close" onClick={handleClose}>
                    <AiOutlineClose />
                </div>
                <div className="modal-title">Join Team Matrix</div>
                <div className="modal-input-container">
                    <input
                        className="userInput"
                        placeholder="Matrix Code"
                        type="number"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                    ></input>
                    <TextButton
                        id="join"
                        customStyle={{
                            backgroundColor: "rgba(200, 150, 249, 0.3)",
                            borderColor: "rgba(200, 150, 249, 0.3)",
                        }}
                        handleClick={joinTeamMatrix}
                    />
                </div>
            </section>
        </div>
    );
};

export default Modal;
