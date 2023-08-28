import { useSelector } from "react-redux";
import "../../css/text-button.css";

const TextButton = ({ id, handleClick, type, customStyle }) => {
  
  const label =  id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
  return (
    <div>
      <button
        className={type || "text-button"}
        style={customStyle}
        onClick={handleClick}
      >
        {label}
      </button>
    </div>
  );
};

export default TextButton;