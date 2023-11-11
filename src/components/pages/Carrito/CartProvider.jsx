import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CartContext from './CartContext';
import { useAuth } from '../../../Auth/UseAuth';
import {
  getCartItems,
  increaseQuantity,
  decreaseQuantity,
  deleteProductFromCart,
  updateProductQuantity,
  addProductToCart,
} from '../../../config/api/apiUtils';

export const CartProvider = ({ children }) => {
  const { isLogueado, usuario } = useAuth();
  const token = localStorage.getItem('token');

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Actualización de los artículos del carrito y el total
    const calculateTotal = () => {
      const newTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotal(newTotal);
    };

    calculateTotal();
  }, [cartItems]);

  useEffect(() => {
    const localCart = localStorage.getItem('cart');
    if (isLogueado) {
      const fetchCartItems = async () => {
        const cartData = await getCartItems(token);
        setCartItems(cartData.products); // Asumiendo que cartData tiene la estructura correcta
        setTotal(cartData.total);
      };

      fetchCartItems();
    } else if (localCart) {
      const parsedCart = JSON.parse(localCart);
      setCartItems(parsedCart.products);
      setTotal(parsedCart.total);
    }
  }, [isLogueado, token]);

  useEffect(() => {
    if (!isLogueado) {
      localStorage.setItem(
        'cart',
        JSON.stringify({ products: cartItems, total: total })
      );
    }
  }, [cartItems, total, isLogueado]);

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

      setCartItems(currentItems => {
        // Verificar si el producto ya está en el carrito
        const existingItemIndex = currentItems.findIndex(item => item.id === product.id);
    
        // Si ya existe, incrementar la cantidad
        if (existingItemIndex > -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1,
          };
          return updatedItems;
        } else {
          // Si el producto no está en el carrito, agregarlo
          return [...currentItems, productWithCartId];
        }
      });

    } else {
      const productWithCartId = {
        ...productToAdd,
        cartItemId: product.id,
      };

      setCartItems(currentItems => {
        // Verificar si el producto ya está en el carrito
        const existingItemIndex = currentItems.findIndex(item => item.id === product.id);
    
        // Si ya existe, incrementar la cantidad
        if (existingItemIndex > -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1,
          };
          return updatedItems;
        } else {
          // Si el producto no está en el carrito, agregarlo
          return [...currentItems, productWithCartId];
        }
      });

    }
  };

  const removeFromCart = async (cartItemId) => {
    if (isLogueado) {
      const response = await deleteProductFromCart(cartItemId);
      if (response) {
        setCartItems(currentItems => currentItems.filter(item => item.cartItemId !== cartItemId));
      }
    } else {
      setCartItems(currentItems => currentItems.filter(item => item.cartItemId !== cartItemId));
    }
  };

  const increaseProductQuantity = async (cartItemId) => {
    if (isLogueado) {
      const updatedProducts = await increaseQuantity(cartItems, cartItemId);
      if (updatedProducts) {
        setCartItems(currentItems =>
          currentItems.map(item =>
            item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      }
    } else {
      // Lógica para incrementar la cantidad en el estado local y localStorage
      setCartItems(currentItems =>
        currentItems.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };

  const decreaseProductQuantity = async (cartItemId) => {
    if (isLogueado) {
      const updatedProducts = await decreaseQuantity(cartItems, cartItemId);
      if (updatedProducts) {
        setCartItems(currentItems =>
          currentItems.map(item =>
            item.cartItemId === cartItemId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
          )
        );
      }
    } else {
      // Lógica para decrementar la cantidad en el estado local y localStorage
      setCartItems(currentItems =>
        currentItems.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
        )
      );
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    if (isLogueado) {
      const updatedProduct = await updateProductQuantity(
        cartItems,
        cartItemId,
        quantity
      );
      if (updatedProduct) {
        setCartItems(currentItems =>
          currentItems.map(item =>
            item.cartItemId === cartItemId ? { ...item, quantity: quantity } : item
          )
        );
      }
    } else {
      // Lógica para actualizar la cantidad en el estado local y localStorage
      setCartItems(currentItems =>
        currentItems.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity: quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
  };
  

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        removeFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        updateQuantity,
        addToCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
