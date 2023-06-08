//some key point:-
// This code defines a shopping cart context using React's Context API. 
// It creates a context using `createContext` and initializes it with an initial state for cart details.
// The `CartWrapper` component serves as a provider for this context and manages the cart data. 
// It relies on the `useAuthContext` hook to access the authentication context, allowing it to retrieve the user's ID for cart operations.
// The `useState` hook is used to manage the `cartData` state, representing the items in the shopping cart.
// The `emptyCart` function clears the `cartData` state, effectively emptying the shopping cart.
// The `updateCart` function is responsible for updating the cart data. If `updatedCartList` is provided, it updates the `cartData` state with the new list. 
// Otherwise, it retrieves the cart data from the server using the authenticated user's ID obtained from the `authContext`, using the `cartService` module.

import React, { createContext, useContext, useEffect, useState } from "react";
import cartService from "../service/cart.service";
import { useAuthContext } from "./auth";

const initialCartDetails = {
  cartData: [],
  updateCart: () => {},
  emptyCart: () => {},
};

const cartContext = createContext(initialCartDetails);

export const CartWrapper = ({ children }) => {
  const authContext = useAuthContext();
  const [cartData, setCartData] = useState([]);

  const emptyCart = () => {
    setCartData([]);
  };

  const updateCart = (updatedCartList) => {
    if (updatedCartList) {
      setCartData(updatedCartList);
    } else if (authContext.user.id) {
      cartService.getList(authContext.user.id).then((res) => setCartData(res));
    }
  };

  useEffect(() => {
    updateCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.user.id]);

  const value = {
    cartData,
    emptyCart,
    updateCart,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(cartContext);
};
