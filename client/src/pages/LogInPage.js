import { TextButton } from "../Components/Buttons/TextButton";
import Checkbox from "../Components/Buttons/Checkbox";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const LogInPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const edge = document.querySelector(".edge-login");
    edge.style.transform = "translateY(-96vh) translateX(-96vw) scale(26, 26)";

    const hideButton = document.querySelector(".edge-button");
    hideButton.style.display = "none";
  };

  const handleAnimationEnd = () => {
    navigate("/SignUp");
  };

  return (
    <div className="logInPage">
      <div className="loginContainer">
        <div className="title">Log In</div>
        <div className="inputContainer">
          <input
            className="userInput"
            placeholder="Username"
            type="text"
          ></input>
          <input
            className="userInput"
            type={"password"}
            name="password"
            placeholder="Password"
          ></input>

          <div className="rememberMeContainer">
            <Checkbox label="Remember Me" checked={true} />
          </div>
        </div>
        <TextButton id="submit" />
        <div className="guest">Continue as Guest</div>
      </div>

      <div className="edge-wrapper">
        <div className="edge-login" onTransitionEnd={handleAnimationEnd}></div>
        <TextButton id="signUp" handleClick={handleClick} type="edge-button" />
      </div>
    </div>
  );
};

export default LogInPage;
