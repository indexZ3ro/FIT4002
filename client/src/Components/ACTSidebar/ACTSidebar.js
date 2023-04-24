import React from "react";
import "../../css/actSidebar.css";
import SheetIcon from "./DraggableIcons/SheetIcon";
import TextIcon from "./DraggableIcons/TextIcon";
import EditIcon from "./DraggableIcons/EditIcon";
import BluePointerIcon from "./DraggableIcons/BluePointerIcon";

const ACTSidebar = (props) => {
    return (
        <div className="actSidebar">
            <div className="draggable-container">
                {/* Add draggable components here */}
                <div className="draggable-item">
                    <SheetIcon />
                </div>

                <div className="draggable-item">
                    <TextIcon />
                </div>

                <div className="draggable-item">
                    <EditIcon />
                </div>

                <div className="draggable-item">
                    <BluePointerIcon />
                </div>
            </div>
        </div>
    );
};

export default ACTSidebar;
