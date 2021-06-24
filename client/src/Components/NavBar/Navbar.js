import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar/Searchbar.js";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Dropdown from "../Dropdown/Dropdown.js";
/* import { FaSortAlphaDown } from "react-icons/fa"; */
import { useDispatch, useSelector } from "react-redux";
import {
  filterByGenre,
  sortAlphabeticallyAsc,
  sortAlphabeticallyDesc,
  sortByRatingAsc,
  sortByRatingDesc,
} from "../../Redux/actions/index.js";

const sort = [
  { id: 1, name: "A-Z" },
  { id: 2, name: "Z-A" },
  { id: 3, name: "Rating 1 to 10" },
  { id: 4, name: "Rating 10 to 1" },
];

function Navbar() {
  const genres = useSelector((state) => state.videogamesReducer.genres.data);
  const allVideogames = useSelector(
    (state) => state.videogamesReducer.allVideogames.data
  );
  const [selection, setSelection] = useState([]);
  const [sortSelected, setSortSelected] = useState([]);

  console.log(sortSelected, "este es el sort selected");

  const dispatch = useDispatch();

  /// FILTER

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

  ////SORT

  useEffect(() => {
    var array = [];
    sortSelected.map((e) => {
      ///selection comienza siendo un [] vacio. A medida que voy seleccionando generos, los voy mapeando en el array con la propiedad e-name
      array = [...array, e.name.toLowerCase()];
    });
    console.log(array, "Este es el array de las cosas seleccionadas");

    if (array[0] === "a-z") {
      dispatch(sortAlphabeticallyAsc());
    }
    if (array[0] === "z-a") {
      dispatch(sortAlphabeticallyDesc());
    }
    if (array[0] === "rating 1 to 10") {
      dispatch(sortByRatingAsc());
    }
    if (array[0] === "rating 10 to 1") {
      dispatch(sortByRatingDesc());
    }
  }, [sortSelected]);

  return (
    <div className="nav-bar">
      <div className="left">
        <Link to="/">
          <h1 className="h1">Henry Videogames</h1>
        </Link>

        <SearchBar />
      </div>

      <div className="drop-downs">
        <div className="genre-drop-downs">
          <Dropdown
            title="Genre" //El dropdown multiselect funciona llenando a select a medida que el usuario selecciona generos
            items={genres && genres} //Los generos que le paso son los que estan declarados mas arriba en la constante
            multiselect
            selection={selection}
            setSelection={setSelection}
          />
        </div>
        <div className="sort-drop-downs">
          <Dropdown
            title="Sort" //El dropdown multiselect funciona llenando a select a medida que el usuario selecciona generos
            items={sort} //Los generos que le paso son los que estan declarados mas arriba en la constante
            selection={sortSelected}
            setSelection={setSortSelected}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
