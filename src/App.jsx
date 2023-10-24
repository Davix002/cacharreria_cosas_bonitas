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
import FacturaCompra from "./components/pages/Factura/FacturaCompra";
import CambioContrasena from "./components/pages/Register/SolicitarCambioContrasena";
import FormularioCambioContrasena from "./components/pages/Register/FormularioCambioContrasena";
import CambiarContrasena from "./components/pages/Register/CambiarContrasena";

export default function App() {
  const categoryRoutes = Object.entries(Categories).map((entrada) => (
    <Route
      key={entrada[0]}
      path={`/cacharreria_cosas_bonitas/${entrada[1].name}/`}
      element={
        <Category categoryId={entrada[0]} nombre_categoria={entrada[1].name} />
      }
    />
  ));

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/cacharreria_cosas_bonitas/" element={<Inicio />} />
        <Route path="/cacharreria_cosas_bonitas/Nosotros/" element={<Nosotros />}/>
        <Route path="/cacharreria_cosas_bonitas/Contactanos/" element={<Contactanos />} />
        <Route path="/cacharreria_cosas_bonitas/Login/" element={<Login />} />
        {categoryRoutes}
        <Route path="/cacharreria_cosas_bonitas/Register/" element={<Register/>}/>
	<Route path="/cacharreria_cosas_bonitas/Carrito/"element={<Carrito />} />
        <Route path="/cacharreria_cosas_bonitas/CarritoPagar/"element={<CarritoPagar />} />
        <Route path="/cacharreria_cosas_bonitas/confirmar/:token" element={<ConfirmarRegistro/>} />
        <Route path="/cacharreria_cosas_bonitas/perfil" element={<Perfil/>} />
        <Route path="/cacharreria_cosas_bonitas/espera-confirmacion" element={<EsperaConfirmacion/>} />
        <Route path="/cacharreria_cosas_bonitas/CambioContrasena/" element={<CambioContrasena/>} />
        <Route path="/cacharreria_cosas_bonitas/FacturaCompra/" element={<FacturaCompra />} />
        <Route path="/cacharreria_cosas_bonitas/recuperar/:token" element={<CambiarContrasena />} />
        <Route path="/cacharreria_cosas_bonitas/FormularioCambioContrasena/:token" element={<FormularioCambioContrasena/>} />
      </Routes>

      <Footer />
    </Router>
  );
};

