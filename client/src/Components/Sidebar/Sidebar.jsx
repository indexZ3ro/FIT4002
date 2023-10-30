import React, { useState } from "react";
import "../../css/sidebar.css";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeMenu = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        closeMenu();
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const closeMenuOnClick = () => {
    closeMenu(); // Close the sidebar when any link is clicked
  };

  const navigate = useNavigate();  // Get the navigate function
  const sideBarState = useSelector((state) => state.sideBar.sideBar);

  return (
    <>
      {sideBarState && (
        <Menu 
          isOpen={isSidebarOpen}  // Control open state using isSidebarOpen
          width={"250px"} 
          styles={{ bmMenu: { overflow: "hidden" } }}
          onStateChange={({ isOpen }) => setIsSidebarOpen(isOpen)}  // Update the local state when sidebar state changes
        >
          <Link to="/" className="menu-item" onClick={closeMenuOnClick}>
            Home
          </Link>
          <Link to="/Create" className="menu-item" onClick={closeMenuOnClick}>
            Create
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
      )}
    </>
  );
};

export default Sidebar;
