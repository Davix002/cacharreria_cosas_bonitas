import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../../Auth/AuthContext";
import { useContext } from "react";
import {
  getCartItems,
  increaseQuantity,
  decreaseQuantity,
  deleteProductFromCart,
} from "../../../config/api/apiUtils";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  let updatedItems = [...state.items];
  switch (action.type) {
    case "ADD_TO_CART": {
      const itemToAdd = action.payload;
      const existingItemIndex = updatedItems.findIndex(
        (item) => item.id === itemToAdd.id
      );
      if (existingItemIndex >= 0) {
        // Si el producto ya existe, incrementar la cantidad
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity:
            updatedItems[existingItemIndex].quantity +
            (itemToAdd.quantity || 1),
        };
      } else {
        // Si el producto no existe, agregarlo al arreglo
        updatedItems.push({ ...itemToAdd, quantity: itemToAdd.quantity || 1 });
      }
      break;
    }
    case "SET_CART_ITEMS":
      return {
        ...state,
        items: action.payload.products,
        total: action.payload.total,
      };
    case "REMOVE_FROM_CART":
      updatedItems = state.items.filter((item) => item.id !== action.payload);
      break;
    case "INCREASE_QUANTITY":
      updatedItems = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      break;
    case "DECREASE_QUANTITY":
      updatedItems = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item
      );
      break;
    default:
      return state;
  }
  // Calcular el nuevo total después de cada acción que modifica el carrito
  const newTotal = updatedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return {
    ...state,
    items: updatedItems,
    total: newTotal,
  };
};

export const CartProvider = ({ children }) => {
  const { isLogueado } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
  });

  useEffect(() => {
    if (isLogueado) {
    const fetchCartItems = async () => {
      const cartData = await getCartItems(token);
      dispatch({ type: "SET_CART_ITEMS", payload: cartData });
    };

    fetchCartItems();
  }
  }, [isLogueado, token]);

  const removeFromCart = async (id) => {
    deleteProductFromCart(dispatch, id);
  };

  const increaseProductQuantity = async (id) => {
    const updatedProducts = await increaseQuantity(state.items, id);
    if (updatedProducts) {
      dispatch({ type: "INCREASE_QUANTITY", payload: id });
    }
  };

  const decreaseProductQuantity = async (id) => {
    const updatedProducts = await decreaseQuantity(state.items, id);
    if (updatedProducts) {
      dispatch({ type: "DECREASE_QUANTITY", payload: id });
    }
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        removeFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
