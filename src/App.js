import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import CartItem from "./pages/CartItem";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  // const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Register} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route
            path="/productlist"
            Component={window.localStorage.getItem("loggedIn",true) ? ProductList : Login}
          />
          <Route
            path="/cartitem"
            Component={window.localStorage.getItem("loggedIn",true) ? CartItem : Login}
          />
          <Route
            path="/updateprofile"
            Component={window.localStorage.getItem("loggedIn",true) ? UpdateProfile : Login}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
