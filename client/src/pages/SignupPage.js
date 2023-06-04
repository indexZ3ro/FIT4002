import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/signUpPage.css";
import TextButton from "../Components/Buttons/TextButton";

const SignUpPage = () => {
  const navigate = useNavigate();

  const routeChangeToLogIn = () => {
    const edge = document.querySelector(".edge-signup");
    edge.style.transform = "translateY(-96vh) translateX(-96vw) scale(26, 26)";

    const hideButton = document.querySelector(".edge-button");
    hideButton.style.display = "none";
  };

  const handleAnimationEnd = () => {
    navigate("/");
  };

  const signUp = () => {
    navigate("/Home");
  };

  return (
    <div className="signUpPage">
      <div className="split-left-signup">
        <h2 className="title">New here?</h2>
        <div className="subheading">Sign up and discover your potential!</div>
      </div>
      <div className="split-right-signup">
        <div className="signupContainer">
          <h3 className="heading">Sign Up</h3>
          <div className="inputContainer">
            <input
              className="userInput"
              placeholder="Email"
              type="text"
            ></input>
            <input
              className="userInput"
              type="text"
              placeholder="Username"
            ></input>
            <input className="userInput" placeholder="Name" type="text"></input>
            <input
              className="userInput"
              type="password"
              placeholder="Password"
            ></input>
          </div>
          <TextButton
            id="submit"
            customStyle={{ width: "10vw", height: "5vh", color: "#c8d3b8" }}
            handleClick={signUp}
          />
        </div>
        <div className="edge-wrapper">
          <div
            className="edge-signup"
            onTransitionEnd={handleAnimationEnd}
          ></div>
          <TextButton
            id="logIn"
            handleClick={routeChangeToLogIn}
            type="edge-button"
            textColor="white"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
