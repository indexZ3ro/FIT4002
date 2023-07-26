import TextButton from "../Components/Buttons/text_button";
import { useNavigate } from "react-router-dom";
import "../css/welcomePage.css";
import { useDispatch } from "react-redux";
import { hideSideBar } from "../features/sidebar_slice";

const WelcomePage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(hideSideBar());

  const routeChangeToSignUp = () => {
    let path = `/SignUp`;
    navigate(path);
  };

  const routeChangeToLogIn = () => {
    let path = `/LogIn`;
    navigate(path);
  };

  return (
    <div className="welcome-page">
      <div className="title">TEAMOJI</div>
      <TextButton id="signUp" handleClick={routeChangeToSignUp} />
      <TextButton id="logIn" handleClick={routeChangeToLogIn} />
    </div>
  );
};

export default WelcomePage;