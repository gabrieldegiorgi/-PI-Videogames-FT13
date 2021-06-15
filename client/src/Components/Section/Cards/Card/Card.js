import React from "react";
import { Link } from 'react-router-dom'
import "./Card.css"

function Card({ videogame }) {
  return (
    <Link to= {`/card_details/${videogame.id}`}>    
    <div className="card">
      <div ><img className="videogameImg" src={videogame.background_image}></img></div>
      
      <span>{videogame.name}</span>
      <span>{videogame.genres.map((g)=>g.name)}</span>
    
    </div>

    </Link>

  );
}

export default Card;
