import React, { useState } from 'react'

import "./Form.css";

function Form() {


    const   [name, setName] = useState("")
    const [genre, setGenre] = useState("")
    const [error, setError] = useState("")

    //VALIDATE ---> NAME
    function validateInputs(value){
        if(!regularExpression.test(value)){
            setError("El input debe ser....")
        }else{
            setError("");
        }
        setName(value)

    }
    return (
        <div>
            <form>
                <input name="gameName" value={name} placeholder="Ingresa el nombre de tu videojuego" onChange={(e)=>setName (e.target.value)}> </input>
                <input name="gameGenre" value={genre} placeholder="Ingresa el genero de tu videojuego" onChange={(e)=>setGenre (e.target.value)}></input>
                <input type="submit"></input>
            </form>
            
        </div>
    )
}

export default Form
