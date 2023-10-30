import TextButton from "../Components/Buttons/textButton";
import Checkbox from "../Components/Buttons/Checkbox";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { useDispatch } from "react-redux";
import { hideSideBar } from "../features/sidebarSlice";
import { useEffect } from "react";
import "../css/landingPage.css";
import LandingPageCover from "../assets/LandingPage.svg";
import TeamojiHeader from "../Components/TeamojiHeader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import LandingPageButton from "../Components/LandingPageButton";
import { useState } from "react";
import { signOut } from "firebase/auth";

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(hideSideBar());
    });

    const logIn = () => {
        navigate("/LogIn");
    };

    const SignUp = () => {
        navigate("/SignUp");
    };

    const aboutUs = () => {
        //navigate("/AboutUs");
    };

    const create = () => {
        navigate("/Create");
    };

    const history = () => {
        navigate("/HistoryPage");
    };

    const logOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate("/");
                console.log("Signed out successfully");
            })
            .catch((error) => {
                // An error happened.
            });
    };

    const [state, setState] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setState(true);
            } else {
                // User is signed out
                // ...
                setState(false);
            }
        });
    }, []);

    function UserHeader() {
        return (
            <>
                <LandingPageButton id="Create" handleClick={create} />
                <LandingPageButton id="History" handleClick={history} />
                <LandingPageButton id="Log Out" handleClick={logOut} />
            </>
        );
    }

    function GuestHeader() {
        return (
            <>
                {/* <LandingPageButton id="About Us" handleClick={aboutUs} /> */}
                <LandingPageButton id="Log In" handleClick={logIn} />
                <LandingPageButton id="Sign Up" handleClick={SignUp} />
            </>
        );
    }

    function UserButton() {
        return (
            <TextButton
                id="Create"
                handleClick={create}
                customStyle={{ background: "#EFDFFD" }}
            />
        );
    }

    function GuestButton() {
        return (
            <TextButton
                id="Get Started"
                handleClick={SignUp}
                customStyle={{ background: "#EFDFFD" }}
            />
        );
    }

    return (
        <div className="landingPage">
            <div className="landingPageTop" id="landingPageTop">
                <TeamojiHeader />
                {state ? <UserHeader /> : <GuestHeader />}
            </div>
            <div className="landingPageBottom">
                <div className="landingPageBottomLeft">
                    <h3 className="landing-page-title">
                        Find your goals and values
                    </h3>
                    <h6 className="normal landing-page-text">
                        Visualise and reflect on what matters as an individual
                        or together as a team.
                    </h6>
                    {state ? <UserButton /> : <GuestButton />}
                </div>
                <div className="landingPageBottomRight">
                    <img
                        className="landingPageCover"
                        src={LandingPageCover}
                    ></img>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
