import TextButton from "../Components/Buttons/textButton";
import Checkbox from "../Components/Buttons/Checkbox";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { useDispatch } from "react-redux";
import { hideSideBar } from "../features/sidebarSlice";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import LogInCover from "../assets/logInCover.svg";

const LogInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(hideSideBar());
  });

  const logIn = () => {
    navigate("/Home");
  };

  const signUp = () => {
    navigate("/SignUp");
  };

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/Home");
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="login-page">
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
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              className="userInput"
              type={"password"}
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
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
              handleClick={onLogin}
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
