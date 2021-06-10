import React from "react";
import SearchBar from "./SearchBar/Searchbar.js";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="nav-bar">
      <h1>Henry Videogames</h1>
      <SearchBar />
    </div>
  );
}

export default Navbar;
