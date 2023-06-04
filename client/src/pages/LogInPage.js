import TextButton from "../Components/Buttons/TextButton";
import Checkbox from "../Components/Buttons/Checkbox";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { useDispatch } from "react-redux";
import { hideSideBar } from "../features/sideBarSlice";

const LogInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(hideSideBar());

  const handleClick = () => {
    const edge = document.querySelector(".edge-login");
    edge.style.transform = "translateY(-96vh) translateX(-96vw) scale(26, 26)";

    const hideButton = document.querySelector(".edge-button");
    hideButton.style.display = "none";
  };

  const handleAnimationEnd = () => {
    navigate("/SignUp");
  };

  const logIn = () => {
    navigate("/Home");
  };

  return (
    <div className="logInPage">
      <div className="split-left-login">
        <div className="teamoji-title">TEAMOJI</div>
      </div>
      <div className="split-right-login">
        <div className="loginContainer">
          <div className="heading">Log In</div>
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
              <Checkbox style={{"font-family": 'Mukta'}} label="Remember Me" checked={true} />
            </div>
          </div>
          <TextButton
            id="submit"
            customStyle={{ width: "10vw", height: "5vh", color: "#beafe1", 'font-family': "Mukta", }}
            handleClick={logIn}
          />
          <div className="guest">Continue as Guest</div>
        </div>

        <div className="edge-wrapper">
          <div
            className="edge-login"
            onTransitionEnd={handleAnimationEnd}
          ></div>
          <TextButton
            id="signUp"
            handleClick={handleClick}
            type="edge-button"
            textColor="white"
          />
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
