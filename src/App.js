import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import CartItem from "./pages/CartItem";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" Component={Register} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/product-list" Component={ProductList} />
          <Route path="/cart-item" Component={CartItem} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
