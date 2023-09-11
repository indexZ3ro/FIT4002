import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { hideSideBar } from "../features/sidebarSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import "../css/sign-up.css";
import TextButton from "../Components/Buttons/textButton";
import SignUpPageCover from "../assets/signUpPageCover.svg";

const SignUpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(hideSideBar());
  });

  const signUp = () => {
    // onSubmit;
    navigate("/Home");
  };

    const logIn = () => {
        navigate("/LogIn");
    };

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        navigate("/Home");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;

        switch (errorCode) {
          case "auth/email-already-exists":
            setError("Email already exists");
            break;
          case "auth/invalid-email":
            setError("Invalid Email");
            break;
          case "auth/invalid-password":
            setError(
              "Invalid password. It must be a string with at least six characters."
            );
            break;
          case "auth/missing-password":
            setError("Password is missing");
            break;
          case "auth/weak-password":
            setError("Password is weak");
            break;
        }

        // ..
      });
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
        <div className="signUpTitle">Sign Up</div>
        <div className="inputContainer">
          <input
            className="userInput text"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <input
            className="userInput text "
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            className="userInput text"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            className="userInput text"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <p className="error-message">{error}</p>
          <TextButton
            id="signUp"
            customStyle={{
              width: "15vw",
              height: "5vh",
              background: "#EFDFFD",
            }}
            handleClick={onSubmit}
          />
          <div className="signUpToLogin" onClick={logIn}>
            Already have an account?
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
