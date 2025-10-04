import { useState } from "react";
import "../Header2.css";

function Header2() {
  
  return (
<>
  <header className="gc-header">
      {/* Top Section */}
      <div className="gc-topbar">
        <div className="gc-logo-section">
          <img src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg" alt="Government of Canada Logo" className="gc-logo" />
        </div>
        <a href="#" className="gc-lang">Français</a>
      </div>

      {/* Navigation Bar */}
      <nav className="gc-nav">
        <ul>
          <li><a href="#">Definitions</a></li>
          <li><a href="#">Frequently Asked Questions (FAQ)</a></li>
          <li><a href="#">Help</a></li>
        </ul>
      </nav>

   
    </header>
</>
  );
}

export default Header2;