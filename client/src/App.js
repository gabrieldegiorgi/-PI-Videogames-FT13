import "./App.css";
import Navbar from "./Components/NavBar/Navbar.js";
import Section from "./Components/Section/Section.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CardDetail from "./Components/Section/CardDetail/CardDetail";
import { useEffect, useState } from "react";
import axios from "axios";
require("dotenv").config();
const { REACT_APP_BASE_URL, REACT_APP_GET_GAMES } = process.env;

function App() {


//PAGINADO VIDEO YOUTUBE

 /*  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(15);

  useEffect (()=>{
    const fetchPosts = async () =>{
      setLoading(true);
      const res = await axios.get(`${REACT_APP_BASE_URL}${REACT_APP_GET_GAMES}`);
      setPosts(res.data)
      setLoading(false);

    }

    fetchPosts()
  },[]); 
  console.log(posts, "Estos son los posts")*/


  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/">
          <Section />
        </Route>
        <Route exact path="/card_details/:id">
          <CardDetail />
        </Route>
      </div>
    </Router>
  );
}

export default App;
