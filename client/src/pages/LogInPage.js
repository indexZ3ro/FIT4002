import TextButton from "../Components/Buttons/text_button";
import Checkbox from "../Components/Buttons/Checkbox";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { useDispatch } from "react-redux";
import { hideSideBar } from "../features/sidebar_slice";
import { useEffect } from "react";
import LogInCover from "../assets/logInCover.svg";

const LogInPage = () => {
  const navigate = useNavigate();

  const logIn = () => {
    navigate("/Home");
  };

  const signUp = () => {
    navigate("/SignUp");
  };

  return (
    <div className="login-page">
      <div className="split-left-login">
        <div className="logInPageTeam">Teamoji</div>
        <img className="logInPageCoverImg" src={LogInCover}></img>
      </div>

      <div className="split-right-login">
        <div className="login-container">
          <h1>Login</h1>
          <div className="input-container">
            <input
              className="userInput text"
              placeholder="Email"
              type="text"
            ></input>
            <input
              className="userInput text"
              type={"password"}
              name="password"
              placeholder="Password"
            ></input>

            {/* <div className="rememberMeContainer">
              <Checkbox label="Remember Me" checked={true} />
            </div> */}
          </div>
          <TextButton
            id="submit"
            customStyle={{
              width: "15vw",
              height: "5vh",
              background: "#EFDFFD",
            }}
            handleClick={logIn}
          />
          <div className="loginToSignUp text" onClick={signUp}>
            New Here?
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
