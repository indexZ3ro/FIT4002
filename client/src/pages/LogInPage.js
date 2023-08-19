import TextButton from "../Components/Buttons/textButton";
import Checkbox from "../Components/Buttons/Checkbox";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { useDispatch } from "react-redux";
import { hideSideBar } from "../features/sidebarSlice";
import { useEffect } from "react";
import LogInCover from "../assets/logInCover.svg";

const LogInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(hideSideBar());
  });

  const logIn = () => {
    navigate("/Home");
  };

  const signUp = () => {
    navigate("/SignUp");
  };

  return (
    <div className="login-page">
      <div> test test</div>
      <div className="split-left-login">
        <div className="logInPageTeam">Teamoji</div>
        <img className="logInPageCoverImg" src={LogInCover}></img>
      </div>

      <div className="split-right-login">
        <div className="login-container">
          <div className="loginTitle">Login</div>
          <div className="input-container">
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

            {/* <div className="rememberMeContainer">
              <Checkbox label="Remember Me" checked={true} />
            </div> */}
          </div>
          <div>
            <TextButton
              id="logIn"
              customStyle={{
                width: "15vw",
                height: "5vh",
                background: "#EFDFFD",
              }}
              handleClick={logIn}
            />
            <div className="loginToSignUp" onClick={signUp}>
              New Here?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
