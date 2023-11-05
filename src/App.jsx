import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Auth/PrivateRoute";
import { useState, useEffect } from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Inicio from "./components/pages/Inicio/Inicio";
import Nosotros from "./components/pages/Nosotros/Nosotros";
import Contactanos from "./components/pages/Contactanos/Contactanos";
import Login from "./components/pages/Login/Login";
import Category from "./components/pages/Productos/Category";
import { fetchCategories } from "../src/config/api/apiUtils";
import Register from "./components/pages/Register/Register";
import Carrito from "./components/pages/Carrito/Carrito";

import ConfirmarRegistro from "./Auth/ConfirmarRegistro";
import Perfil from "./components/pages/Users/Perfil";
import EsperaConfirmacion from "./components/pages/Register/EsperaConfirmacion";
import { AuthProvider } from "./Auth/AuthProvider";
import FacturaCompra from "./components/pages/Factura/FacturaCompra";
import CambioContrasena from "./components/pages/Register/SolicitarCambioContrasena";
import FormularioCambioContrasena from "./components/pages/Register/FormularioCambioContrasena";
import CambiarContrasena from "./Auth/CambiarContrasena";
import AdminCategorias from "./components/pages/Administracion/CategoryList";
import Spinner from "./components/pages/Inicio/Spinner";
import { CartProvider } from "../src/components/pages/Carrito/CartContext";
import { CategoryProvider } from "./components/pages/Administracion/CategoryProvider";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const categoryRoutes = categories.map((categoria) => (
    <Route
      key={categoria.id}
      path={`/cacharreria_cosas_bonitas/${categoria.name}/`}
      element={
        <Category categoryId={categoria.id} nombre_categoria={categoria.name} />
      }
    />
  ));

  return (
    <AuthProvider>
      <CategoryProvider>
        <CartProvider>
          <Router>
            <Header />

            <Routes>
              <Route
                path="/cacharreria_cosas_bonitas/Admin/categorias"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <AdminCategorias />
                  </PrivateRoute>
                }
              />
              {/*<Route path="/cacharreria_cosas_bonitas/Admin/productos" element={
           <PrivateRoute roles={['admin']}>
              <AdminProductos />
            </PrivateRoute>
          } />*/}
              <Route path="/cacharreria_cosas_bonitas/" element={<Inicio />} />
              <Route
                path="/cacharreria_cosas_bonitas/Nosotros/"
                element={<Nosotros />}
              />
              <Route
                path="/cacharreria_cosas_bonitas/Contactanos/"
                element={<Contactanos />}
              />
              <Route
                path="/cacharreria_cosas_bonitas/Login/"
                element={<Login />}
              />
              {categoryRoutes}
              <Route
                path="/cacharreria_cosas_bonitas/Register/"
                element={<Register />}
              />
              <Route
                path="/cacharreria_cosas_bonitas/Carrito/"
                element={<Carrito />}
              />
              
              <Route
                path="/cacharreria_cosas_bonitas/confirmar/:token"
                element={<ConfirmarRegistro />}
              />
              <Route
                path="/cacharreria_cosas_bonitas/perfil"
                element={<Perfil />}
              />
              <Route
                path="/cacharreria_cosas_bonitas/espera-confirmacion"
                element={<EsperaConfirmacion />}
              />
              <Route
                path="/cacharreria_cosas_bonitas/CambioContrasena/"
                element={<CambioContrasena />}
              />
              <Route
                path="/cacharreria_cosas_bonitas/FacturaCompra/"
                element={<FacturaCompra />}
              />
              <Route
                path="/cacharreria_cosas_bonitas/recuperar/:token"
                element={<CambiarContrasena />}
              />
              <Route
                path="/cacharreria_cosas_bonitas/FormularioCambioContrasena/:token"
                element={<FormularioCambioContrasena />}
              />{" "}
            </Routes>

            <Footer />
          </Router>
        </CartProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}
