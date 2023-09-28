import TextButton from "../Components/Buttons/textButton";
import Checkbox from "../Components/Buttons/Checkbox";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { useDispatch } from "react-redux";
import { hideSideBar } from "../features/sidebarSlice";
import { useEffect } from "react";
import "../css/landingPage.css";
import LandingPageCover from "../assets/LandingPage.svg";

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
        navigate("/AboutUs");
    };
  
    return (
        <div className="landingPage">
            <div className="landingPageTop">
                <div className="landingPageTeamTitleContainer textFont semiBold m">
                    Teamoji
                </div>


                {/* <div className="landingPageTopButton textFont s">About Us</div> */}
                <h6 className="normal landingPageTopButton" onClick={aboutUs} >About Us</h6>
                <h6 className="normal landingPageTopButton" onClick={logIn}>
                    Log In
                </h6>
                <h6 className="normal landingPageTopButton" onClick={SignUp}>
                    Sign Up
                </h6>
            </div>
            <div className="landingPageBottom">
                <div className="landingPageBottomLeft">
                    {/* <div className="landingPageBottomTitle textFont semiBold l">
                        Find your goals and values
                    </div> */}
                    <h3 className="landing-page-title">
                        Find your goals and values
                    </h3>
                    {/* <div className="landingPageSubtitle textFont xs"> </div>*/}
                    <h6 className="normal landing-page-text">
                        Authentically replicate the ACT Matrix process and allow
                        individuals and teams to reflect on their visual map and
                        progress in an ongoing manner.
                    </h6>
                    <TextButton
                        id="Get Started"
                        handleClick={SignUp}
                        customStyle={{ background: "#EFDFFD" }}
                    ></TextButton>
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
