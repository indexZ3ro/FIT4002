import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/sign-up.css";
import TextButton from "../Components/Buttons/text_button";

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
    <div className="sign-up-page">
      <div className="split-left-signup">
        <h2 className="title">New here?</h2>
        <div className="subheading">Sign up and discover your potential!</div>
      </div>
      <div className="split-right-signup">
        <div className="sign-up-container">
          <h3 className="heading">Sign Up</h3>
          <div className="input-container">
            <input
              className="user-input"
              placeholder="Email"
              type="text"
            ></input>
            <input
              className="user-input"
              type="text"
              placeholder="Username"
            ></input>
            <input className="user-input" placeholder="Name" type="text"></input>
            <input
              className="user-input"
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
            id="login"
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
