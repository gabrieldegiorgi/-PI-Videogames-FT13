import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card/Card.js";
import "./Cards.css";
import { getVideogames } from "../../../Redux/actions/index.js";
import { paginate } from "../../../utils/index.js";
/* 
import dotenv from "dotenv";
import axios from "axios";
dotenv.config(); 
const { REACT_APP_BASE_URL, REACT_APP_GET_GAMES } = process.env; */

function Cards({ input }) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const data = useSelector((state) => state.videogamesReducer.videogames.data);

  if (data) {
    var videogames = paginate(data, page);
    console.log(videogames, "Estos son los videogames");
  }

  /*   const [videogames, setVideogames] = useState([]); */

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  //Paginado

  const pagination = (number) => {
    setPage(number);
  };

  //Hacer un slice para mostrar una parte del arreglo de videojuegos

  //Loadash libreria

  return (
    <div className="cards">
      <h3>Estas son las tarjetas</h3>
      {videogames &&
        videogames.result.map(
          (
            videogame,
            index //EL INDEX ME SIRVE PARA PASARLE UN NUMERO DE MAPEO A CADA COMPONENTE QUE ESTOY MAPEANDO DEL ARREGLO
          ) => <Card key={index} videogame={videogame} input={input} />
        )}
      {videogames && videogames.pagination.prev && (
        <button
          onClick={() => {
            pagination(videogames.pagination.prev);
          }}
        >
          Anterior
        </button>
      )}

      {videogames && videogames.pagination.next && (
        <button
          onClick={() => {
            pagination(videogames.pagination.next);
          }}
        >
          Siguiente
        </button>
      )}
    </div>
  );
}

export default Cards;
