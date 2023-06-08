//some key point:-
// This code defines an authentication context using React's Context API.
// It creates a context using `createContext` and initializes it with an initial state.
// The `AuthWrapper` component serves as a provider for this context, managing the user's authentication state, and providing functions to set the user and sign out. 
// It uses React Router's `useLocation` and `useNavigate` hooks to handle navigation based on the current URL path. 
// The code also includes useEffect hooks to check the user's authentication status and authorization for accessing specific routes, displaying toast notifications for unauthorized access. 
// The `useAuthContext` hook allows child components to access the authentication context and retrieve the user's state and related functions.

import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import shared from "../utils/shared";

const intialUserValue = {
  email: "",
  firstName: "",
  id: 0,
  lastName: "",
  password: "",
  role: "",
  roleId: 0,
};

const initialState = {
  setUser: () => {},
  user: intialUserValue,
  signOut: () => {},
};

const authContext = createContext(initialState);

export const AuthWarpper = ({ children }) => {
  const [user, _setUser] = useState(intialUserValue);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const str = JSON.parse(localStorage.getItem("user")) || intialUserValue;
    if (str.id) {
      _setUser(str);
    }
    if (!str.id) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (pathname === "/login" && user.id) {
      navigate("/");
    }
    if (!user.id) {
      return;
    }
    const access = shared.hasAccess(pathname, user);
    if (!access) {
      toast.warning("sorry, you are not authorized to access this page");
      navigate("/");
      return;
    }
    // eslint-disable-next-line
  }, [user, pathname]);

  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    _setUser(user);
  };

  const signOut = () => {
    setUser(intialUserValue);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const value = {
    user,
    setUser,
    signOut,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
export const useAuthContext = () => {
  return useContext(authContext);
};
