import { Button, Divider, IconButton } from "@mui/material";
import React, { useMemo } from "react";
import logo from "../assets/logo.jpg";
import { HiShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";
import shared from "../utils/shared";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import { useCartContext } from "../context/cart";
const Header = () => {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const cartContext = useCartContext();
  const logOut = () => {
    authContext.signOut();
  };

  const items = useMemo(() => {
    return shared.NavigationItems.filter(
      (item) =>
        !item.access.length || item.access.includes(authContext.user.roleId)
    );
  }, [authContext.user]);

  return (
    <>
      <div className="flex justify-between items-center bg-white ">
        <img src={logo} alt="TatvaSoft_Logo" className="h-24 ml-40 w-44" />
        <div className="mr-40  space-x-1 flex">
        <Link to="/">
        <IconButton color="error">
    <Home />
  </IconButton>
  </Link>
          {!authContext.user.id && (
            <>
              <Button
                variant="text"
                sx={{
                  color: "#f14d54",
                  textTransform: "capitalize",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ backgroundColor: "#f14d54" }}
              />
              <Button
                variant="text"
                sx={{ color: "#f14d54", textTransform: "capitalize" }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </Button>
             

            </>
            
          )}
          {items.map((item, index) => (
            <>
              <Button
                key={index}
                variant="text"
                
                sx={{
                  color: "#f14d54",
                  textTransform: "capitalize",
                }}
                onClick={() => {
                  navigate(item.route);
                }}
              >
                {item.name}
              </Button>
             
            </>
          ))}

          <Button
            variant="outlined"
            sx={{
              color: "#f14d54",
              borderColor: "#f14d54",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
            startIcon={<HiShoppingCart />}
            onClick={() => {
              navigate("/cart-page");
            }}
          >
            {cartContext.cartData.length}
            <span
              style={{
                color: "black",
                marginLeft: "4px",
                fontWeight: "normal",
              }}
            >
              cart
            </span>
          </Button>
          {!!authContext.user.id ? (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#f14d54",
                "&:hover": {
                  backgroundColor: "#f14d54", // Change the hover background color
                },
                textTransform: "capitalize",
              }}
              onClick={() => {
                logOut();
              }}
            >
              LogOut
            </Button>
          ) : null}
         
        </div>
      </div>
    </>
  );
};

export default Header;
