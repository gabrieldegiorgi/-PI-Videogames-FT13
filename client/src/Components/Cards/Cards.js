import React, { useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const { REACT_APP_GET_GAMES } = process.env;

function Cards() {
  useEffect(() => {
    axios
      .get(`https://cors-anywhere.herokuapp.com/${REACT_APP_GET_GAMES}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);







  return <div></div>;
}

export default Cards;
