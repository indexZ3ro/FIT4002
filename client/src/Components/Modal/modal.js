import React from "react";
import "../../css/modal.css";
import TextButton from "../Buttons/textButton";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ handleClose, show, create }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const navigate = useNavigate();

  const routePathToCreateTeamMatrix = () => {
    navigate("/TeamSession");
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
            placeholder="Team Name"
            type="text"
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
