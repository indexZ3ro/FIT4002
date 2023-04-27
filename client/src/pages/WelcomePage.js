import { TextButton } from "../Components/Buttons/TextButton";
import { useNavigate } from "react-router-dom";
import "../css/welcomePage.css";

const WelcomePage = () => {
  let navigate = useNavigate();

  const routeChangeToSignUp = () => {
    let path = `/SignUp`;
    navigate(path);
  };

  const routeChangeToLogIn = () => {
    let path = `/LogIn`;
    navigate(path);
  };

  return (
    <div className="welcomePage">
      <div className="title">TEAMOJI</div>
      <TextButton id="signUp" handleClick={routeChangeToSignUp} />
      <TextButton id="logIn" handleClick={routeChangeToLogIn} />
    </div>
  );
};

export default WelcomePage;
