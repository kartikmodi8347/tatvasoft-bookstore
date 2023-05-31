import React from "react";
import "../styles/Header.css";
//import logo from '../assets/images/logo.jpg'
//import { Button } from "@mui/material";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { RiMenuLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import SearchBox from "./SearchBox";

function Header() {
  return (
    <div className="header">
      <img
        src="https://bookstore-sooty.vercel.app/static/media/site-logo.005b78aa01d0b4eadda3fa91c02202c5.svg"
        alt=""
      />

      <div className="button">
        {window.localStorage.getItem("loggedIn", true) ? null : (
          <Link to="/register">
            <Button variant="text">Register</Button>
          </Link>
        )}
        {window.localStorage.getItem("loggedIn", true) ? (
          <Link to="/cartitem">
            <Button variant="contained" endIcon={<AiOutlineShoppingCart />}>
              Cart
            </Button>
          </Link>
        ) : null}
        {window.localStorage.getItem("loggedIn", true) ? (
          <Link to="/productlist">
            <Button variant="contained" endIcon={<RiMenuLine />}>
              Category
            </Button>
          </Link>
        ) : null}
        {window.localStorage.getItem("loggedIn", true) ? (
          <Link to="/updateprofile">
            <Button variant="contained" endIcon={<FaUserEdit />}>
              Update Profile
            </Button>
          </Link>
        ) : null}
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
      </div>
      <div className="search" >
        <SearchBox />
      </div>
    </div>
  );
}
export default Header;
