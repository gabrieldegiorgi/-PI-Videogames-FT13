import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import Card from "./Card/Card.js";
import "./Cards.css";
import {getVideogames} from "../../../Redux/actions/index.js"
/* 
import dotenv from "dotenv";
import axios from "axios";
dotenv.config(); */
/* 
const { REACT_APP_BASE_URL, REACT_APP_GET_GAMES } = process.env; */

function Cards({input}) {

  const dispatch = useDispatch();
  
  const {data} = useSelector((state) => state.videogamesReducer.videogames);
  console.log(data, "Este es el estado")

/*   const [videogames, setVideogames] = useState([]); */

  useEffect(() => {    
    /* 
    axios
      .get(`${REACT_APP_BASE_URL}${REACT_APP_GET_GAMES}`)
      .then((response) => {
        console.log(response.data); //Arreglo de videojuegos
        setVideogames(response.data);
      })
      .catch((error) => console.log(error)); */

      dispatch(getVideogames());
      
  }, []);  

  return (
    <div className="cards">
      <h3>Estas son las tarjetas</h3>
      {data &&
        data.map(
          (
            videogame,
            index //EL INDEX ME SIRVE PARA PASARLE UN NUMERO DE MAPEO A CADA COMPONENTE QUE ESTOY MAPEANDO DEL ARREGLO
          ) => (<Card key={index} videogame={videogame} input={input} />)
        )}
    </div>
  );
}

export default Cards;
