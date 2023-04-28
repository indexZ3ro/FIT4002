import { useSelector } from "react-redux";
import "../../css/button.css";

const IconButton = ({ id }) => {
  const icon = useSelector((state) => state.iconButton[id]);
  return <button className="iconButton">{icon}</button>;
};

export default IconButton;
