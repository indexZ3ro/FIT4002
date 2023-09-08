import React from "react";
import "../../css/sidebar.css";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { useSelector } from "react-redux";

const Sidebar = (props) => {
    const sideBarState = useSelector((state) => state.sideBar.sideBar);
    return sideBarState ? (
        <Menu width={"250px"} styles={{ bmMenu: { overflow: "hidden" } }}>
            <Link to="/" className="menu-item">
                Home
            </Link>
            {/* <Link to="/TeamSession" className="menu-item">
                Team Session
            </Link> */}
            {/* <Link to="/SoloSession" className="menu-item">
                Solo Session
            </Link> */}
            <Link to="/HistoryPage" className="menu-item">
                History
            </Link>
            <Link to="/Settings" className="menu-item">
                Settings
            </Link>
        </Menu>
    ) : (
        <div></div>
    );
};

export default Sidebar;
