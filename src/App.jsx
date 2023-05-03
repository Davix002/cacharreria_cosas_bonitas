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
  const categoryArray = Object.keys(Categories).map((key) => ({
    ...Categories[key],
    originalKey: key,
  }));

  const categoryRoutes = categoryArray.map((category) => (
    <Route
      key={category.originalKey}
      path={`/cacharreria_cosas_bonitas/${category.name}`}
      element={<Category categoryId={category.originalKey} nombre_categoria={category.name} />}
    />
  ));

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/cacharreria_cosas_bonitas" element={<Inicio />} />
        <Route path="/cacharreria_cosas_bonitas/Productos" element={<Productos />} />
        <Route path="/cacharreria_cosas_bonitas/Nosotros" element={<Nosotros />} />
        <Route path="/cacharreria_cosas_bonitas/API" element={<Api />} />
        <Route path="/cacharreria_cosas_bonitas/Login" element={<Login />} />
        {categoryRoutes}
      </Routes>

      <Footer />
    </Router>
  );
}
