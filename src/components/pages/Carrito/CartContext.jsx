import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getCartItems
} from "../../../config/api/apiUtils";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "SET_CART_ITEMS":
      return {
        ...state,
        items: action.payload.products,
        total: action.payload.total,
      };
      case "REMOVE_FROM_CART":
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
        };
      case "INCREASE_QUANTITY":
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      case "DECREASE_QUANTITY":
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
          ),
        };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartData = await getCartItems();
      dispatch({ type: 'SET_CART_ITEMS', payload: cartData });
    };
  
    fetchCartItems();
  }, []);

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const increaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
