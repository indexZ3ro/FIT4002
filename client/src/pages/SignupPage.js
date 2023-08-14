import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/sign_up.css";
import TextButton from "../Components/Buttons/TextButton";
import SignUpPageCover from "../assets/signUpPageCover.svg";

const SignUpPage = () => {
  const navigate = useNavigate();

  const signUp = () => {
    navigate("/Home");
  };

  const logIn = () => {
    navigate("/LogIn");
  };

  return (
    <div className="signUpPage">
      <div className="split-left-signup">
        <div className="signUpPageTeam">Teamoji</div>
        <div className="signUpPageCover">
          <img className="signUpPageCoverImg" src={SignUpPageCover}></img>
        </div>
      </div>
      <div className="split-right-signup">
        <h1>Sign Up</h1>
        <div className="inputContainer">
          <input
            className="userInput text"
            placeholder="Email"
            type="text"
          ></input>
          <input
            className="userInput text "
            type="text"
            placeholder="Username"
          ></input>
          <input
            className="userInput text"
            placeholder="Name"
            type="text"
          ></input>
          <input
            className="userInput text"
            type="password"
            placeholder="Password"
          ></input>
          <TextButton
            id="submit"
            customStyle={{
              width: "15vw",
              height: "5vh",
              background: "#EFDFFD",
            }}
            handleClick={signUp}
          />
          <div className="signUpToLogin text" onClick={logIn}>
            Already have an account?
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
