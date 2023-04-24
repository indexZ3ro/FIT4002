import React from 'react';
import './sidebar.css';
import { Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';

const Sidebar = (props) => {
  return (
    <Menu width={ '250px' } styles={{bmMenu: {"overflow-y": 'hidden'}}}>
      <Link to="/" className="menu-item">Home Screen</Link>
      <Link to="/SoloSession" className="menu-item">Solo Session</Link>
    </Menu>
  );
};

export default Sidebar;