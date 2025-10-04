import React from "react";

function SearchBar() {
  return (
    <div className="searchbar">
      <a href="/" className="lang-link">Français</a>
      <input type="text" placeholder="Search IRCC" />
      <button className="search-btn">🔍</button>
    </div>
  );
}

export default SearchBar;
