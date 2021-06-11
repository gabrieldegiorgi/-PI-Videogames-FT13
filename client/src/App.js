import "./App.css";
import Navbar from "./Components/NavBar/Navbar.js";
import Section from "./Components/Section/Section.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CardDetail from "./Components/Section/CardDetail/CardDetail";

function App() {
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
