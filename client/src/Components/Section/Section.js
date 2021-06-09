import React from 'react'
import Cards from "./Cards/Cards.js"
import Sidebar from "./Sidebar/Sidebar"
import "./Section.css"


function Section() {
    return (
        <div className="section">
            <Sidebar/>
            <Cards/>
            
        </div>
    )
}

export default Section
