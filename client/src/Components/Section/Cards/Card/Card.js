import React from "react";
import "./Card.css"

function Card({ videogame }) {
  return (
    <div className="card">
      <span>{videogame.name}</span>
      <span>{videogame.updated}</span>
      <span>{videogame.platforms.map((p) => p.platform.name)}</span>
      <span>{videogame.ratings.map((p) => p.title)}</span>
    </div>
  );
}

export default Card;
