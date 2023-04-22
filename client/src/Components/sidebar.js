import React from 'react';
import './sidebar.css';
import { Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu width={ '250px' } styles={{bmMenu: {"overflow-y": 'hidden'}}}>
      <a id="homeScreen" className="menu-item" href="/">
        Home Screen
      </a>
      <Link to="/soloSession">Solo Session</Link>
    </Menu>
  );
};