import React, { useState } from "react";
import "../Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-content">
      
          
          <div className="logo-container">
            <img 
              src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg"
              className="logo"
            />
            <div className="logo-text">
             
            </div>
          </div>
          
          <div className="header-right">
            <a href="#" className="lang-link">Français</a>
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search IRCC" 
                className="search-input"
              />
              <button className="search-button">🔍</button>
            </div>
          </div>
        </div>
      </header>
          <button 
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            MENU <span className="menu-arrow">{menuOpen ? '▲' : '▼'}</span>
          </button>
      {menuOpen && (
        <div className="dropdown-menu">
          <ul>
            <li><a href="#">Jobs and the workplace</a></li>
            <li><a href="#">Immigration and citizenship</a></li>
            <li><a href="#">Travel and tourism</a></li>
            <li><a href="#">Business and industry</a></li>
            <li><a href="#">Benefits</a></li>
            <li><a href="#">Health</a></li>
            <li><a href="#">Taxes</a></li>
            <li><a href="#">Environment and natural resources</a></li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Header;
