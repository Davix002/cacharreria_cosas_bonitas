import { useContext } from "react";
import { CartContext } from "./CartContext"; // Esto debe ser una importación con llaves si lo has exportado como arriba

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
