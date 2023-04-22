import React from 'react';
import './sidebar.css';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="#homeScreen">
        Home Screen
      </a>
      <a className="menu-item" href="#soloSession">
        Solo Session
      </a>
      <a className="menu-item" href="#teamSession">
        Team Session
      </a>
      <a className="menu-item" href="#settings">
        Settings
      </a>
    </Menu>
  );
};