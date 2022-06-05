import { createContext, useContext, useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { commerce } from "../lib/commerce";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({});

  const fetchLoginStatus = () => {
    setIsLoggedIn(commerce.customer.isLoggedIn());
  };

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();
    setCategories(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId) => {
    const item = await commerce.cart.add(productId);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchLoginStatus();
    fetchCategories();
    fetchCart();
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     setCategories(data.data);
  //   }
  // }, [data]);

  const context = {
    isLoggedIn,
    categories,
    cart,
    fetchLoginStatus,
    handleAddToCart,
    handleUpdateCartQty,
    handleRemoveFromCart,
    handleEmptyCart,
    handleCaptureCheckout,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
