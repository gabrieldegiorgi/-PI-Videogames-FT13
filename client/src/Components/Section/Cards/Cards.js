import React, { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import Card from "./Card/Card.js";
import "./Cards.css";
dotenv.config();

const { REACT_APP_GET_GAMES } = process.env;

function Cards() {
  const [videogames, setVideogames] = useState([]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_GET_GAMES}`)
      .then((response) => {
        console.log(response.data); //Arreglo de videojuegos
        setVideogames(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="cards">
      {videogames &&
        videogames.map(
          (
            videogame,
            index //EL INDEX ME SIRVE PARA PASARLE UN NUMERO DE MAPEO A CADA COMPONENTE QUE ESTOY MAPEANDO DEL ARREGLO
          ) => <Card key={index} videogame={videogame} />
        )}
    </div>
  );
}

export default Cards;
