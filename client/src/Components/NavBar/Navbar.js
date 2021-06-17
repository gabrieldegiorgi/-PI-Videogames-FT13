import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar/Searchbar.js";
import "./Navbar.css";
import Dropdown from "./Dropdown/Dropdown.js";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre } from "../../Redux/actions/index.js";

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 3, name: "RPG" },
  { id: 4, name: "Strategy" },
  { id: 5, name: "Shooter" },
  { id: 6, name: "Casual" },
];

function Navbar() {
  const allVideogames = useSelector(
    (state) => state.videogamesReducer.allVideogames.data
  );
  const [selection, setSelection] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    var array = [];
    selection.map((e) => {
      ///selection comienza siendo un [] vacio. A medida que voy seleccionando generos, los voy mapeando en el array con la propiedad e-name
      array = [...array, e.name.toLowerCase()];
    });
    if (allVideogames) {
      dispatch(filterByGenre(array));
    }
  }, [selection]);

  return (
    <div className="nav-bar">
      <h1>Henry Videogames</h1>
      <SearchBar />
      <Dropdown
        title="Genre" //El dropdown multiselect funciona llenando a select a medida que el usuario selecciona generos
        items={genres} //Los generos que le paso son los que estan declarados mas arriba en la constante
        multiselect
        selection={selection}
        setSelection={setSelection}
      />
    </div>
  );
}

export default Navbar;
