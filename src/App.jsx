import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Inicio from "./components/pages/Inicio/Inicio";
import Nosotros from "./components/pages/Nosotros/Nosotros";
import Api from "./components/pages/Api/Api";
import Login from "./components/pages/Login/Login";
import Category from "./components/pages/Productos/Category";
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
