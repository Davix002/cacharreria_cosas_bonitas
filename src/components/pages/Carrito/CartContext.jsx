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
      // ...
      break;
    case "INCREASE_QUANTITY":
      // ...
      break;
    case "DECREASE_QUANTITY":
      // ...
      break;
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

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
