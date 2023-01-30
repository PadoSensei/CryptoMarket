import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import Product from "./components/Product";
import Profile from "./components/Profile";
import Shrine from "./components/Shrine";

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <div className="logo">
            <h1>
              <a href=""> BJJ GYM </a>
            </h1>
          </div>
          <ul>
            <li>
              <a href="./">Home</a>
            </li>
            <li>
              <a href="./Products">Products</a>
            </li>
            <li>
              <a href="./Profile">Profile</a>
            </li>
            <li>
              <a href="./Shrine">Shrine</a>
            </li>
            <li className="nav-cta">
              <a href="#">Connect</a>
            </li>
          </ul>
        </nav>
      </header>

      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Products" element={<Product />} />
          <Route path="/Shrine" element={<Shrine />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
