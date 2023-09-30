import React from "react";
import "../../css/sidebar.css";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        props.closeMenu();
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const closeMenuOnClick = () => {
    props.closeMenu(); // Close the sidebar when any link is clicked
  };

  const sideBarState = useSelector((state) => state.sideBar.sideBar);
  return sideBarState ? (
    <Menu width={"250px"} styles={{ bmMenu: { overflow: "hidden" } }}>
      <Link to="/Home" className="menu-item" onClick={closeMenuOnClick}>
        Home
      </Link>
      <Link to="/HistoryPage" className="menu-item" onClick={closeMenuOnClick}>
        History
      </Link>
      <Link to="/Settings" className="menu-item" onClick={closeMenuOnClick}>
        Settings
      </Link>
      <Link className="menu-item" onClick={handleLogout}>
        Sign Out
      </Link>
    </Menu>
  ) : (
    <div></div>
  );
};

export default Sidebar;
