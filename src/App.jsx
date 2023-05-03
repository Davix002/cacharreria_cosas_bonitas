import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Nosotros from "./pages/Nosotros";
import Api from "./pages/Api";
import Login from "./pages/Login";
import Category from "./components/Category";
import Categories from "./data/categories";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {

  const categoryRoutes = Object.entries(Categories).map((entrada) => (
    <Route
      key={entrada[0]}
      path={`/cacharreria_cosas_bonitas/${entrada[1].name}`}
      element={
        <Category
          categoryId={entrada[0]}
          nombre_categoria={entrada[1].name}
        />
      }
    />
  ));

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/cacharreria_cosas_bonitas" element={<Inicio />} />
        <Route
          path="/cacharreria_cosas_bonitas/Productos"
          element={<Productos />}
        />
        <Route
          path="/cacharreria_cosas_bonitas/Nosotros"
          element={<Nosotros />}
        />
        <Route path="/cacharreria_cosas_bonitas/API" element={<Api />} />
        <Route path="/cacharreria_cosas_bonitas/Login" element={<Login />} />
        {categoryRoutes}
      </Routes>

      <Footer />
    </Router>
  );
}
