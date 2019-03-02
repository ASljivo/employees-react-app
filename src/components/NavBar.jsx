import React from "react";
import { NavLink } from "react-router-dom";

import "../assets/nav-bar.scss"

const NavBar = (props) => {
  return (
    < nav className="topnav" >
      <div className="content">
        <NavLink className="navbar-brand" activeClassName="active" to="/employees">
          Employees
      </NavLink>

        <NavLink className="navbar-brand" activeClassName="active" to="/projects">
          Projects
      </NavLink>
      </div>
    </nav >
  );
};

export default NavBar;
