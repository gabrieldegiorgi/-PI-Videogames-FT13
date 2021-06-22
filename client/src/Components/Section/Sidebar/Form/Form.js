import React, { useState } from "react";
import { validate } from "../../../../utils";
import "./Form.css";

function Form() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    date: "",
    rating: "",
  });

  const [errors, setErrors] = useState({});

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
    <div className="form">
      <form>
        <label>Nombre</label>
        <input
          className={`${errors.name && "danger"}`}
          name="name"
          value={input.name}
          placeholder="Ingresa el nombre de tu videojuego"
          onChange={(e) => handleInputChange(e.target)}
        />
        {errors.name && <p className="danger">{errors.name}</p>}

        <label>Descripcion</label>
        <input
          className={errors.description && "danger"}
          name="description"
          type="text"
          value={input.description}
          placeholder="Describe tu videojuego"
          onChange={(e) => handleInputChange(e.target)}
        />
        {errors.description && <p className="danger">{errors.description}</p>}

        <label>Fecha de lanzamiento</label>
        <input
          className={errors.date && "danger"}
          name="date"
          type="date"
          value={input.date}
          placeholder="Ingresa la fecha de lanzamiento de tu videojuego"
          onChange={(e) => handleInputChange(e.target)}
        />
        {errors.date && <p className="danger">{errors.date}</p>}

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

        <select>
          <option value="Accion">Accion</option>
          <option value="Aventura">Aventura</option>
          <option value="RPG">RPG</option>
          <option value="Estrategia">Estrategia</option>
          <option value="Shooter">Shooter</option>
          <option value="Causal">Casual</option>
        </select>

        <select>
          <option value="Accion">Playstation</option>
          <option value="Aventura">Computadora</option>
          <option value="RPG">Nintendo</option>
          <option value="Estrategia">Otra</option>
          <option value="Shooter">Otra 2</option>
          <option value="Causal">Otra 3</option>
        </select>

        <select multiple={true} value={["B", "C"]}></select>

        <input type="submit" value="Crear videojuego" />
      </form>
    </div>
  );
}

export default Form;
