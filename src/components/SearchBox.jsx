import axios from "axios";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import "../styles/SearchBox.css";

const SearchBox = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [openSearchResult, setOpenSearchResult] = useState(false);

  const fetchData = async (value) => {
    try {
      const response = await axios.get(
        `https://book-e-sell-node-api.vercel.app/api/book/search?keyword=${value}`
      );
      setResults(response.data.result);
      setOpenSearchResult(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(input);
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleCancel = () => {
    setInput("");
    setOpenSearchResult(false);
  };

  return (
    <div>
      <div
        className="form"
        style={{ position: "fixed", top: "90px", left: "500px" }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            label="What are you looking for.."
            size="small"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<AiOutlineSearch />}
          >
            Search
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCancel}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </form>

        {openSearchResult && (
          <div className="result-list">
            {results?.length > 0 &&
              results.map((result, id) => {
                return (
                  <div className="result-box" key={id}>
                    <div>{result.name}</div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Link to="/productlist">
                        <button type="submit" className="add-to-cart-button">
                          Add to cart
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
