import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { sumBy } from "lodash";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  root: {
    backgroundColor: "white",
    color: "#333333",
    fontSize: "larger",
    textAlign: "center",
    border: 10,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    border: 10,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 10,
  },
}));

export default function ProductTable() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 110,
      quantity: 0,
      category: "Category 1",
    },
    {
      id: 2,
      name: "Product 2",
      price: 115,
      quantity: 0,
      category: "Category 2",
    },
    {
      id: 3,
      name: "Product 3",
      price: 256,
      quantity: 0,
      category: "Category 3",
    },
    {
      id: 4,
      name: "Product 4",
      price: 2476,
      quantity: 0,
      category: "Category 4",
    },
    {
      id: 5,
      name: "Product 5",
      price: 3025,
      quantity: 0,
      category: "Category 5",
    },
  ]);

  const handleIncrementQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const handleDecrementQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const calculateTotalPrice = (price, quantity) => {
    return price * quantity;
  };

  const handleCartButtonClick = () => {
    const totalPrice = sumBy(products, (product) =>
      calculateTotalPrice(product.price, product.quantity)
    );
    alert(`Total Price: ₹${totalPrice}`);
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ Width: 700 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
              <StyledTableCell>Total Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell>{product.name}</StyledTableCell>
                <StyledTableCell>{product.price}</StyledTableCell>
                <StyledTableCell>{product.quantity}</StyledTableCell>
                <StyledTableCell>{product.category}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDecrementQuantity(product.id)}
                    disabled={product.quantity === 0}
                  >
                    -
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleIncrementQuantity(product.id)}
                  >
                    +
                  </Button>
                </StyledTableCell>
                <StyledTableCell>
                  {calculateTotalPrice(product.price, product.quantity)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCartButtonClick}
      >
        Cart
      </Button>
    </div>
  );
}
