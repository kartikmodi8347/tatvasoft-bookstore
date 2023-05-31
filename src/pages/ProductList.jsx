import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/Login.css'

const Products = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    axios
      .get("https://book-e-sell-node-api.vercel.app/api/book/all")
      .then((res) => {
        setBooks(res.data.result);
      });
  }, []);

  const handleSearch = () => {
    // Perform the search based on the searchQuery
    // Ex: filter the books array based on the book name or any other criteria
    const filteredBooks = books.filter((book) =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredBooks;
  };

  const handleSort = (filteredBooks) => {
    // Sort the filteredBooks based on the sortOrder
    if (sortOrder === "A-Z") {
      filteredBooks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "Z-A") {
      filteredBooks.sort((a, b) => b.name.localeCompare(a.name));
    }
    return filteredBooks;
  };

  const filteredBooks = handleSearch();
  const sortedBooks = handleSort(filteredBooks);
  const totalBooks = books.length; // Total number of books

  return (
    <>
      <Header />
      <div className="product">
        <div className="containerprod">
          <h1>Books</h1>
          <div className="search-sort-row">
          <div className="total-books">
              Total Books: {totalBooks}
            </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="sort-box">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>
          
          </div>
          {sortedBooks.length > 0 ? (
            <div className="grid grid-three-column">
              {sortedBooks.map((book) => (
                <Product
                  key={book.id}
                  base64image={book.base64image}
                  name={book.name}
                  category={book.category}
                  description={book.description}
                  price={book.price}
                />
              ))}
            </div>
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
