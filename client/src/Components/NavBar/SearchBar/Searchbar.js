import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {videogameSearch} from "../../../Redux/actions"
import "./Searchbar.css"
import { ImSearch } from "react-icons/im";

/* import {useHistory}from "react-router-dom" */
/* import axios from "axios";
import dotenv from "dotenv"; */

function Searchbar() {

  const dispatch = useDispatch()
  const [input, setInput] = useState("")
  
  const onChangeHandler = (e) =>{
    setInput(e)
  }
  const onClickHandler = () =>{
    dispatch(videogameSearch(input))
  }

  return (
    <div className="search-bar">
      <input className="search-input" value={input} onChange={(e) =>{onChangeHandler(e.target.value)}} placeholder="Busca tu videojuego..."></input>
      <button className="search-btn" type="submit" onClick={()=> {onClickHandler()}}><ImSearch/></button>
    </div>
  );
}

export default Searchbar;
