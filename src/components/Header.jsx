import React from "react";
import "../styles/Header.css";
//import logo from '../assets/images/logo.jpg'
import { Button } from "@mui/material";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <img
        src="https://bookstore-sooty.vercel.app/static/media/site-logo.005b78aa01d0b4eadda3fa91c02202c5.svg"
        alt=""
      />

      <div className="button">
        {window.localStorage.getItem("loggedIn", true) ? (
          <Button
            variant="text"
            onClick={() => {
              window.localStorage.clear();
              window.location.href = "/";
            }}
          >
            logout
          </Button>
        ) : (
          <Link to="/login">
            <Button variant="text" color="primary">
              Login
            </Button>
          </Link>
        )}
        {window.localStorage.getItem("loggedIn", true) ? null : (
          <Link to="/register">
            <Button variant="text">Register</Button>
          </Link>
        )}

        <Button variant="contained" endIcon={<AiOutlineShoppingCart />}>
          cart
        </Button>
      </div>
    </div>
  );
}
export default Header;
