import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Inicio from "./components/pages/Inicio/Inicio";
import Nosotros from "./components/pages/Nosotros/Nosotros";
import Contactanos from "./components/pages/Contactanos/Contactanos";
import Login from "./components/pages/Login/Login";
import Category from "./components/pages/Productos/Category";
import Categories from "./data/categories";
import Register from "./components/pages/Register/Register";
import Carrito from "./components/pages/Carrito/Carrito";
import CarritoPagar from "./components/pages/Carrito/CarritoPagar"
import ConfirmarRegistro from "./components/pages/Register/ConfirmarRegistro";
import Perfil from "./components/pages/Users/Perfil";
import EsperaConfirmacion from "./components/pages/Register/EsperaConfirmacion";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  const categoryRoutes = Object.entries(Categories).map((entrada) => (
    <Route
      key={entrada[0]}
      path={`/cacharreria_cosas_bonitas/${entrada[1].name}/`}
      element={<Category categoryId={entrada[0]} nombre_categoria={entrada[1].name} />}
    />
  ));

  const shouldShowHeaderAndFooter = !(location.pathname === "/cacharreria_cosas_bonitas/Iniciar_sesion/" || location.pathname === "/cacharreria_cosas_bonitas/Register/");

  return (
    <div>
      {shouldShowHeaderAndFooter && <Header />}

      <Routes>
        <Route path="/cacharreria_cosas_bonitas/" element={<Inicio />} />
        <Route path="/cacharreria_cosas_bonitas/Nosotros/" element={<Nosotros />} />
        <Route path="/cacharreria_cosas_bonitas/Contactanos/" element={<Contactanos />} />
        <Route path="/cacharreria_cosas_bonitas/Iniciar_sesion/" element={<Login />} />
        {categoryRoutes}
        <Route path="/cacharreria_cosas_bonitas/Register/" element={<Register />} />
        <Route path="/cacharreria_cosas_bonitas/Carrito/"element={<Carrito />} />
        <Route path="/cacharreria_cosas_bonitas/CarritoPagar/"element={<CarritoPagar />} />
        <Route path="/cacharreria_cosas_bonitas/confirmar/:token" element={<ConfirmarRegistro/>} />
        <Route path="/cacharreria_cosas_bonitas/perfil" element={<Perfil/>} />
        <Route path="/cacharreria_cosas_bonitas/espera-confirmacion" element={<EsperaConfirmacion/>} />
      </Routes>

      {shouldShowHeaderAndFooter && <Footer />}
    </div>
  );
};

export default App;
