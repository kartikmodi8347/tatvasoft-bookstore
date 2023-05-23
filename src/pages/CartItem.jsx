import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
//import { Link } from "react-router-dom";
import '../styles/ProductList.css';
//import { Button } from "@mui/material";
//import { AiOutlineShoppingCart } from 'react-icons/ai';

function CartItem() {
    return(
        <>
        <Header/>
        <div className="product-list"><h1>Cart Item Component</h1><br />
        
        
        </div>
        
        <Footer/>
        </>
    );
}
export default CartItem;
