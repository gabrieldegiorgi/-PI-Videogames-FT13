import React, { useEffect, useRef, useState } from "react";
import { validate } from "../../../../utils";
import "./Form.css";
import { RiCloseCircleFill } from "react-icons/ri";
import { createVideogame } from "../../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../../Dropdown/Dropdown.js";


const platforms = [
  { id: 1, name: "PC" },
  { id: 2, name: "Playstation 2" },
  { id: 3, name: "Playstation 3" },
  { id: 4, name: "Playstation 4" },
  { id: 5, name: "xBox 360" },
  { id: 6, name: "Nintendo" },
];

function Form({ showModal, setShowModal }) {
  const genres = useSelector((state) => state.videogamesReducer.genres.data);
  const [errors, setErrors] = useState({});
  const [genresSelected, setGenresSelected] = useState([]);
  const [platformsSelected, setPlatformsSelected] = useState([]);

  const [input, setInput] = useState({
    name: "",
    description: "",
    date: "",
    rating: "",
    genres: [],
  });

  //POR CADA VEZ QUE EL USUARIO SELECCIONA,
  //AL ESTADO GENRES LE TENGO QUE DECIR

  useEffect(() => {
    var array = [];

    array = genresSelected.map((g) => g.name);

    console.log(input.genres);

    setInput({
      ...input,
      genres: array,
    });
  }, [genresSelected]);

  useEffect(() => {
    var array = [];

    array = platformsSelected.map((p) => p.name);

    setInput({
      ...input,
      platforms: array,
    });
  }, [platformsSelected]);

  const dispatch = useDispatch();
  const modalRef = useRef(); //Hook de react que me permite tener una referencia

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      //Si hago click afuera del modal (en el wrapper), se cierra el modal gracias a useRef
      setShowModal(false);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log("Esto es input", input);
    dispatch(createVideogame(input));
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.name]: e.value,
    });

    var objError = validate({
      ...input,
      [e.name]: e.value,
    });
    setErrors(objError);
  };

  return (
    <>
      {showModal && (
        <div className="wrapper" ref={modalRef} onClick={closeModal}>
          <div className="form-container">
            <form>
              <i className="icon" onClick={() => setShowModal((prev) => !prev)}>
                <RiCloseCircleFill />
              </i>
              <div className="form-element">
                <label>Nombre</label>
                <input
                  className={`${errors.name && "danger"}`}
                  name="name"
                  value={input.name}
                  placeholder="Ingresa el nombre de tu videojuego"
                  onChange={(e) => handleInputChange(e.target)}
                />
                {errors.name && <p className="danger">{errors.name}</p>}
              </div>
              <div className="form-element">
                <label>Descripcion</label>
                <textarea
                  className={errors.description && "danger"}
                  name="description"
                  type="text"
                  value={input.description}
                  placeholder="Describe tu videojuego"
                  onChange={(e) => handleInputChange(e.target)}
                />
                {errors.description && (
                  <p className="danger">{errors.description}</p>
                )}
              </div>
              <div className="form-element">
                <label>Fecha de lanzamiento</label>
                <input
                  className={errors.date && "danger"}
                  name="date"
                  type="text"
                  value={input.date}
                  placeholder="Ingresa la fecha de lanzamiento de tu videojuego"
                  onChange={(e) => handleInputChange(e.target)}
                />
                {errors.date && <p className="danger">{errors.date}</p>}
              </div>
              <div className="form-element">
                <label>Rating</label>
                <input
                  className={errors.rating && "danger"}
                  name="rating"
                  value={input.rating}
                  type="number"
                  placeholder="Ingresa el rating de tu videojuego"
                  onChange={(e) => handleInputChange(e.target)}
                />
                {errors.rating && <p className="danger">{errors.rating}</p>}
              </div>

              <div className="row-element">
                <Dropdown
                  title="genres"
                  items={genres && genres}
                  multiselect
                  selection={genresSelected}
                  setSelection={setGenresSelected}
                />
                <Dropdown
                  title="platforms"
                  items={platforms}
                  multiselect
                  selection={platformsSelected}
                  setSelection={setPlatformsSelected}
                />
              </div>

              <button
                className="button"
                type="submit"
                onClick={(e) => onSubmitHandler(e)}
              >
                Crear Juego
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Form;
