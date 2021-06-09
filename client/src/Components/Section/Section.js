import React from "react";
import Cards from "./Cards/Cards";
import Sidebar from "./Sidebar/Sidebar.js";
import "./Section.css";

function Section() {
  return (
    <div className="section">
      <Sidebar />
      <Cards />
    </div>
  );
}

export default Section;
