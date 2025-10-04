import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await signOut(auth);
        // Clear any stored data
        localStorage.clear();
        sessionStorage.clear();
        alert("✅ Logged out successfully!");
        navigate("/login"); // Redirect to login page
      } catch (error) {
        console.error("Error logging out:", error);
        alert("❌ Failed to logout. Please try again.");
      }
    }
  };

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
        <button onClick={handleLogout} className="sidebar-link logout">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;