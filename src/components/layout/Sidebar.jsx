import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <p className="sidebar-category">All Pages</p>
        <NavLink to="/applications" className="sidebar-link">
          All Applications
        </NavLink>
        <NavLink to="/candidates" className="sidebar-link">
          All Candidates List
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <NavLink to="/logout" className="sidebar-link logout">
          Logout
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
