import stickyNotes from "../assets/stickyNotes.png";
import "../css/createTeamMatrix.css";
import TextButton from "../Components/Buttons/TextButton";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const CreateTeamMatrix = () => {
  const navigate = useNavigate();

  const createTeamMatrix = () => {
    navigate("/TeamSession");
  };

  return (
    <div className="create-team-matrix">
      <div className="team-matrix-top">
        <div className="icon-button">
          <CgProfile />
        </div>
      </div>
      <div className="team-matrix-mid">
        <div className="team-matrix-split-left">
          <div className="team-matrix-input-wrapper">
            <h1>Team Matrix</h1>
            <div className="team-matrix-input-container">
              <input
                className="team-matrix-input"
                type="text"
                placeholder="Team Name"
              ></input>
            </div>
            <div className="team-matrix-input-container">
              <input
                className="team-matrix-input"
                type="text"
                placeholder="Timer"
              ></input>
            </div>
            <div className="team-matrix-input-container">
              <TextButton
                id="start"
                handleClick={createTeamMatrix}
              ></TextButton>
            </div>
          </div>
        </div>
        <div className="team-matrix-split-right">
          <img src={stickyNotes} alt="stickyNotes"></img>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamMatrix;