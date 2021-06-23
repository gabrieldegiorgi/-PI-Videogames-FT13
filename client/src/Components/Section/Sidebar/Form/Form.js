import React, { useRef, useState } from "react";
import { validate } from "../../../../utils";
import "./Form.css";
import { RiCloseCircleFill } from "react-icons/ri";
import { createVideogame } from "../../../../Redux/actions";
import { useDispatch } from "react-redux";
import Dropdown from "../../../Dropdown/Dropdown.js";

const genres = [
  { id: 1, name: "Aventura" },
  { id: 2, name: "Accion" },
  { id: 3, name: "Shooter" },
  { id: 4, name: "RPG" },
  { id: 5, name: "Strategy" },
  { id: 6, name: "Casual" }
];

function Form({ showModal, setShowModal }) {
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    date: "",
    rating: "",
  });

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
              <div className="form-element">
                <select>
                  <Dropdown items={genres} />
                  {/*   <option value="Accion">Accion</option>
                  <option value="Aventura">Aventura</option>
                  <option value="RPG">RPG</option>
                  <option value="Estrategia">Estrategia</option>
                  <option value="Shooter">Shooter</option>
                  <option value="Causal">Casual</option> */}
                </select>
              </div>
              <div className="form-element">
                {/* <select>
                  <option value="Accion">Playstation</option>
                  <option value="Aventura">Computadora</option>
                  <option value="RPG">Nintendo</option>
                  <option value="Estrategia">Otra</option>
                  <option value="Shooter">Otra 2</option>
                  <option value="Causal">Otra 3</option>
                </select> */}
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
