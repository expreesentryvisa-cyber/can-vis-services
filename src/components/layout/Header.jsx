import React from "react";
import "./Header.css";

// This line is now UNCOMMENTED
// import userAvatar from "../../assets/images/user-avatar.png";

const Header = ({ onMenuClick }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          &#9776;
        </button>
        <h1 className="header-title">Management</h1>
      </div>
      <div className="header-right">
        <div className="user-profile">
          {/* This image tag will now work correctly */}
          {/* <img src={userAvatar} alt="User Avatar" className="user-avatar" /> */}
          <span className="user-name">Sahil Agarwal</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
