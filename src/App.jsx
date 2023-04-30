import { products } from "./data/products";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Nosotros from "./pages/Nosotros";
import Api from "./pages/Api";
import Login from "./pages/Login";
import Product_grid from "./pages/Product_grid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


export default function App() {
  return (
    <Router>
        <Header />
        
        <Routes>
          <Route path="/cacharreria_cosas_bonitas" element={<Inicio />} />
          <Route path="/cacharreria_cosas_bonitas/Productos" element={<Productos />} />
          <Route path="/cacharreria_cosas_bonitas/Nosotros" element={<Nosotros />} />
          <Route path="/cacharreria_cosas_bonitas/API" element={<Api />} />
          <Route path="/cacharreria_cosas_bonitas/Login" element={<Login />} />
          <Route path="/cacharreria_cosas_bonitas/Aseo_hogar" element={<Product_grid products={products} title={"Aseo hogar"}/>} />
        </Routes>
        <Footer />
    </Router>
  );
}
