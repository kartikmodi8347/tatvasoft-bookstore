import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Register.css";

const Product = (book) => {
  return (
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
    </div>
  );
};

export default Product;
