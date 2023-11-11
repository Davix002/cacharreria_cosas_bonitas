import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import CartContext from "./CartContext";
import { useAuth } from "../../../Auth/UseAuth";
import {
  getCartItems,
  increaseQuantity,
  decreaseQuantity,
  deleteProductFromCart,
  updateProductQuantity,
  addProductToCart
} from "../../../config/api/apiUtils";

const cartReducer = (state, action) => {
  let updatedItems = [...state.items];
  switch (action.type) {
    case "ADD_TO_CART": {
      const itemToAdd = action.payload;
      const existingItemIndex = updatedItems.findIndex(
        (item) => item.cartItemId === itemToAdd.cartItemId
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
        updatedItems.push({
          ...itemToAdd,
          quantity: itemToAdd.quantity || 1,
          cartItemId: itemToAdd.cartItemId,
        });
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
      updatedItems = state.items.filter(
        (item) => item.cartItemId !== action.payload
      );
      break;
    case "INCREASE_QUANTITY":
      updatedItems = state.items.map((item) =>
        item.cartItemId === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      break;
    case "DECREASE_QUANTITY":
      updatedItems = state.items.map((item) =>
        item.cartItemId === action.payload
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item
      );
      break;
    case "UPDATE_QUANTITY": {
      const { cartItemId, quantity } = action.payload;
      updatedItems = updatedItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: quantity } : item
      );
      break;
    }
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
  const { isLogueado, usuario } = useAuth();
  const token = localStorage.getItem("token");

  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
  });

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (isLogueado) {
      // Carga los artículos del carrito cuando el usuario está logueado
      const fetchCartItems = async () => {
        const cartData = await getCartItems(token);
        dispatch({ type: "SET_CART_ITEMS", payload: cartData });
      };

      fetchCartItems();
    } else if (localCart) {
      // Si hay un carrito en el almacenamiento local, se carga en el estado
      dispatch({ type: "SET_CART_ITEMS", payload: JSON.parse(localCart) });
    }
  }, [isLogueado, token]);

  // Cuando se actualice el estado del carrito, actualizar el almacenamiento local si el usuario no está logueado
  useEffect(() => {
    if (!isLogueado) {
      localStorage.setItem(
        "cart",
        JSON.stringify({ products: state.items, total: state.total })
      );
    }
  }, [state, isLogueado]);

  const addToCart = async (product) => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      imageSrc: product.thumbnail,
      quantity: 1,
    };

    if (isLogueado) {
      const cartItem = await addProductToCart(usuario, productToAdd);
      const productWithCartId = {
        ...productToAdd,
        cartItemId: cartItem._id,
      };

      dispatch({ type: "ADD_TO_CART", payload: productWithCartId });
    } else {
      const productWithCartId = {
        ...productToAdd,
        cartItemId: product.id,
      };
      dispatch({ type: "ADD_TO_CART", payload: productWithCartId });
      
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (isLogueado) {
      const response = await deleteProductFromCart(cartItemId);
      if (response) {
        dispatch({ type: "REMOVE_FROM_CART", payload: cartItemId });
      }
    } else {
      dispatch({ type: "REMOVE_FROM_CART", payload: cartItemId });
    }
  };

  const increaseProductQuantity = async (cartItemId) => {
    if (isLogueado) {
      const updatedProducts = await increaseQuantity(state.items, cartItemId);
      if (updatedProducts) {
        dispatch({ type: "INCREASE_QUANTITY", payload: cartItemId });
      }
    } else {
      // Lógica para incrementar la cantidad en el estado local y localStorage
      dispatch({ type: "INCREASE_QUANTITY", payload: cartItemId });
    }
  };

  const decreaseProductQuantity = async (cartItemId) => {
    if (isLogueado) {
      const updatedProducts = await decreaseQuantity(state.items, cartItemId);
      if (updatedProducts) {
        dispatch({ type: "DECREASE_QUANTITY", payload: cartItemId });
      }
    } else {
      // Lógica para decrementar la cantidad en el estado local y localStorage
      dispatch({ type: "DECREASE_QUANTITY", payload: cartItemId });
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    if (isLogueado) {
      const updatedProduct = await updateProductQuantity(
        state.items,
        cartItemId,
        quantity
      );
      if (updatedProduct) {
        dispatch({
          type: "UPDATE_QUANTITY",
          payload: { cartItemId, quantity },
        });
      }
    } else {
      // Lógica para actualizar la cantidad en el estado local y localStorage
      dispatch({ type: "UPDATE_QUANTITY", payload: { cartItemId, quantity } });
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
        updateQuantity,
        addToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
