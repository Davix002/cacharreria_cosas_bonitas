import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./Inicio";
import Productos from "./Productos";
import Nosotros from "./Nosotros";
import Api from "./Api";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/Nosotros" element={<Nosotros />} />
          <Route path="/API" element={<Api />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
        <Footer />
    </Router>
  );
}
