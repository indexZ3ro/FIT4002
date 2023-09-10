import React, {useState} from "react";
import "../../css/modal.css";
import TextButton from "../Buttons/textButton";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';


const Modal = ({ handleClose, show, create }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');

  const routePathToCreateTeamMatrix =() => {
    const teamDetails = {
      projectName: projectName
    };
    axios.post(apiUrl + '/api/createProject', teamDetails)
    .then(response => {
      const projectKey = response.data.projectKey;
      // Navigate to TeamSession with projectID as parameter
      navigate(`/TeamSession/${projectKey}`);
    })
    .catch(error => {
      console.error("Error creating project:", error);
    });
  }

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
            onChange={e => setProjectName(e.target.value)} 
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
          <input className="userInput" placeholder="Code" type="text"></input>
          <input
            className="userInput"
            type={"password"}
            placeholder="password"
          ></input>
          <TextButton
            id="join"
            customStyle={{
              backgroundColor: "rgba(200, 150, 249, 0.3)",
              borderColor: "rgba(200, 150, 249, 0.3)",
            }}
            handleClick={routePathToCreateTeamMatrix}
          />
        </div>
      </section>
    </div>
  );
};

export default Modal;
