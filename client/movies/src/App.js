import "./App.css";
import MovieCatalog from "./components/MovieCatalog";
import Login from "./components/Login";
import MovieForm from "./components/MovieForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootswatch/dist/lux/bootstrap.min.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container p-4">
        <Routes>
          <Route exact path="/" element={<MovieCatalog />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/new-movie" element={<MovieForm />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
