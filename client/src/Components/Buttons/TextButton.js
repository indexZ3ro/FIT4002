import { useSelector } from "react-redux";
import "../../css/button.css";

const TextButton = ({ id, handleClick, type }) => {
  const label = useSelector((state) => state.textButton[id]);
  return (
    <div>
      <button className={type ? type : "textButton"} onClick={handleClick}>
        {label}
      </button>
    </div>
  );
};

export default TextButton;
