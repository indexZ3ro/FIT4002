import "../css/infinite-canvas.css";
import Line from "../assets/Line.svg";
import Hook from "../assets/Hook.svg";
import StopWatch from "../assets/StopWatch.svg";
import ACT from "../assets/ACT.svg";
import ACTSidebar from "../Components/ACTSidebar/act-sidebar";

const InfiniteCanvas = () => {
  return (
    <div className="infiniteCanvas">
      <div className="topContainer">
        <div className="topLeft">
          <div className="wrapContainer">
            <div className="infiniteCanvasTeam">Teamoji</div>
            <img src={Line}></img>
            <div className="teamName">Team Name</div>
          </div>

          <div className="wrapContainer">
            <img src={Hook}></img>
            <div className="questionTitle">Question</div>
            <img src={Line}></img>
            <div className="question">
              What’s thoughts, feelings and sensations appear when facing
              difficulty?
            </div>
          </div>
        </div>

        {/* </div> */}
        <div className="topRight">
          <div className="timerContainer">
            <div className="wrapContainer">
              <img src={StopWatch}></img>
              <div className="timer">5:30</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bodyContainer">
        <img className="actImage" src={ACT}></img>
        <ACTSidebar />
      </div>
    </div>
  );
};

export default InfiniteCanvas;
