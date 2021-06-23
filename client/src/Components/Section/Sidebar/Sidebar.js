import React, { useState } from "react";
import Form, { validate } from "./Form/Form";
import "./Sidebar.css";

function Sidebar() {
    
  const [showModal, setShowModal] = useState(false);

  
  return (
    <div className="side-bar">
      <Form showModal={showModal} setShowModal={setShowModal} /> {/* //le paso como  props el estado del componente y la funcion que modifica ese estado a form */}
      <button className="create-button" onClick={setShowModal}> {/* AL hacer click pasa a ser ture el estado de showmodal y se muestra */}
        Crear un videojuego
      </button>
    </div>
  );
}

export default Sidebar;
