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
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const sideBarState = useSelector((state) => state.sideBar.sideBar);
  return sideBarState ? (
    <Menu width={"250px"} styles={{ bmMenu: { overflow: "hidden" } }}>
      <Link to="/" className="menu-item">
        Home Screen
      </Link>
      <Link to="/TeamSession" className="menu-item">
        Team Session
      </Link>
      <Link to="/SoloSession" className="menu-item">
        Solo Session
      </Link>
      <Link to="/HistoryPage" className="menu-item">
        History
      </Link>
      <Link to="/Settings" className="menu-item">
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
