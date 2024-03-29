import TextButton from "../Components/Buttons/textButton";
import Checkbox from "../Components/Buttons/Checkbox";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { useDispatch } from "react-redux";
import { hideSideBar } from "../features/sidebarSlice";
import { useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import LogInCover from "../assets/logInCover.svg";
import google_normal from "../assets/google-normal-btn.svg";
import google_hover from "../assets/google-focus-btn.svg";
import TeamojiHeader from "../Components/TeamojiHeader";

const LogInPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        dispatch(hideSideBar());
    });

    const logIn = () => {
        navigate("/Create");
    };

    const signUp = () => {
        navigate("/SignUp");
    };

    const navigateLanding = () => {
        navigate("/");
    };

    const provider = new GoogleAuthProvider();

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/Create");
                // console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                switch (errorCode) {
                    case "auth/invalid-email":
                        setError("Invalid Email");
                        break;
                    case "auth/wrong-password":
                        setError("Wrong password.");
                        break;
                    case "auth/missing-password":
                        setError("Password is missing");
                        break;
                    case "auth/weak-password":
                        setError("Password is weak");
                        break;
                }
            });
    };

    const googleSignIn = async (e) => {
        await signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                navigate("/Create");
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    return (
        <div className="login-page">
            <div className="split-left-login">
                <TeamojiHeader />
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
                        <p className="error-message">{error}</p>

                        {/* <div className="rememberMeContainer">
              <Checkbox label="Remember Me" checked={true} />
            </div> */}
                    </div>
                    <div>
                        <TextButton
                            id="Log In"
                            customStyle={{
                                width: "15vw",
                                height: "5vh",
                                background: "#EFDFFD",
                            }}
                            handleClick={onLogin}
                        />
                        <div
                            className="google-container"
                            onClick={googleSignIn}
                        >
                            {" "}
                            <img
                                className="google-icon-btn"
                                src={google_normal}
                            ></img>
                            Sign In with Google{" "}
                        </div>
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
