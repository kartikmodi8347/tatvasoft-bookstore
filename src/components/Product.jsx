import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Register.css";
// import { Button } from "../styles/Button";
//import styled from "styled-components";


const Product = (book) => {
  //  { id, name, base64image, price , category} = curElem;
  return (
    // <NavLink to={`/singleproduct/${_id}`}>
    <div>
      <div className="card">
        <figure>
          <img src={book.base64image} alt={book.name} />
          <figcaption className="caption">{book.category}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{book.name.slice(0, 20) + "..."}</h3>
            <p className="card-data--price">{"₹" + book.price}</p>
          </div>
          <p>{book.description.slice(0, 35) + "..."}</p>
        </div>
        <NavLink to="/productList">
          <button className="btn-clear btn-c"> Add to cart</button>
        </NavLink>
      </div>
      {/* //  </NavLink> */}
    </div>
  );
};



export default Product;