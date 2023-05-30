import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/Login.css'
// import Product from "./components/Product";


const Products = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("https://book-e-sell-node-api.vercel.app/api/book/all")
      .then((res) => {
        setBooks(res.data.result);
      });
  }, []);
  return (
    <>
    <Header/>
    <div className="product">

    <div className="containerprod">
       {/* <div className="grid grid-three-column">  */}
      {books && books.length > 0 && (
        <div className="grid grid-three-column">
          {books.map((book) => (
            <Product
              base64image={book.base64image}
              name={book.name}
              category={book.category}
              description={book.description}
              price={book.price}
            />
          ))}
        </div>
      )}
      </div>
    </div>
   
    {/* </div> */}
    <Footer/>
    </>
  );
};


export default Products;