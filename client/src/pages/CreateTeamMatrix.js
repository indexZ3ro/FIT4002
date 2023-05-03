import IconButton from "../Components/Buttons/IconButton";
import stickyNotes from "../assets/stickyNotes.png";
import "../css/createTeamMatrix.css";
import TextButton from "../Components/Buttons/TextButton";

const CreateTeamMatrix = () => {
  return (
    <div className="create-team-matrix">
      <div className="team-matrix-top">
        <div className="team-matrix-title">Teamoji</div>
        <IconButton id="profile"></IconButton>
      </div>
      <div className="team-matrix-mid">
        <div className="team-matrix-split">
          <div className="team-matrix-input-wrapper">
            <div className="team-matrix-heading">TEAM MATRIX</div>
            <div className="team-matrix-input-container">
              <div className="team-matrix-input-label">Team Name</div>
              <input className="team-matrix-input" type="text"></input>
            </div>
            <div className="team-matrix-input-container">
              <div className="team-matrix-input-label">Timer</div>
              <input className="team-matrix-input" type="text"></input>
            </div>
          </div>
        </div>
        <div className="team-matrix-split">
          <img src={stickyNotes} alt="stickyNotes"></img>
        </div>
      </div>
      <div className="team-matrix-bottom">
        <TextButton id="start"></TextButton>
      </div>
    </div>
  );
};

export default CreateTeamMatrix;
