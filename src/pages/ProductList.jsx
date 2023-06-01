import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import "../styles/Login.css";

const Products = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    axios
      .get("https://book-e-sell-node-api.vercel.app/api/book/all")
      .then((res) => {
        setBooks(res.data.result);
      });
  }, []);

  const handleSearch = () => {
    const filteredBooks = books.filter((book) =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredBooks;
  };

  const handleSort = (filteredBooks) => {
    if (sortOrder === "A-Z") {
      filteredBooks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "Z-A") {
      filteredBooks.sort((a, b) => b.name.localeCompare(a.name));
    }
    return filteredBooks;
  };

  const filteredBooks = handleSearch();
  const sortedBooks = handleSort(filteredBooks);
  const totalBooks = sortedBooks.length;

  // Calculate pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="product">
        <div className="containerprod">
          <h1>Books</h1>
          <div className="search-sort-row">
            <div className="total-books">Total Books: {totalBooks}</div>
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
          {currentBooks.length > 0 ? (
            <>
              <div className="grid grid-three-column">
                {currentBooks.map((book) => (
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
              <div className="pagination">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
