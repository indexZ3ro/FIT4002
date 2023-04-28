import { useSelector } from "react-redux";
import "../../css/button.css";

const TextButton = ({ id }) => {
  const label = useSelector((state) => state.textButton[id]);
  return <button className="textButton">{label}</button>;
};

export default TextButton;
