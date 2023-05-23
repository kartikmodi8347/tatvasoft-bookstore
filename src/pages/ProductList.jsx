import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import '../styles/ProductList.css';
import { Button } from "@mui/material";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProductTable from "../components/ProductTable";

function ProductList(){
    return(
        <>
        <Header/>
        <div className="product-list"><h1>Product List Component</h1><br />
        <Link to="/cart-item"><Button variant="contained" endIcon={<AiOutlineShoppingCart />}>cart</Button></Link>
        <br/><br />
        <ProductTable />
        </div>
        
        <Footer/>
        </>
    );
}

export default ProductList;