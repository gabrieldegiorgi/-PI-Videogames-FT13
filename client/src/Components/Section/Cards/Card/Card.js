import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card({ videogame }) {
  return (
    <Link to={`/card_details/${videogame.id}`}>
      <div className="card">
        <div className="card-top">
          <img className="videogameImg" src={videogame.background_image}></img>
          <span>{videogame.name}</span>
        </div>

        <div className="card-bot">
          <span>Generos:</span>
          {videogame.genres.map((g) => (
            <span>{g.name}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default Card;
