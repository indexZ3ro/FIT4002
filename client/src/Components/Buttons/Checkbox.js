import { useState } from "react";
import "../../css/checkbox.css";

const Checkbox = ({ label, checked, ...props }) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
        {...props}
      />
      <span className="checkboxLabel">{label}</span>
    </div>
  );
};
export default Checkbox;
