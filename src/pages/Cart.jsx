import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import cartService from "../service/cart.service";
import { useCartContext } from "../context/cart";
import { Button, Typography } from "@mui/material";
import shared from "../utils/shared";
import orderService from "../service/order.service";
import { useAuthContext } from "../context/auth";

const Cart = () => {
  const authContext = useAuthContext();
  const cartContext = useCartContext();
  const navigate = useNavigate();

  const [cartList, setCartList] = useState([]);
  const [itemsInCart, setItemsInCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getTotalPrice = (itemList) => {
    let totalPrice = 0;
    itemList.forEach((item) => {
      const itemPrice = item.quantity * parseInt(item.book.price);
      totalPrice = totalPrice + itemPrice;
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    setCartList(cartContext.cartData);
    setItemsInCart(cartContext.cartData.length);
    getTotalPrice(cartContext.cartData);
  }, [cartContext.cartData]);

  const removeItem = async (id) => {
    try {
      const res = await cartService.removeItem(id);
      if (res) {
        cartContext.updateCart();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const updateQuantity = async (cartItem, inc) => {
    const currentCount = cartItem.quantity;
    const quantity = inc ? currentCount + 1 : currentCount - 1;
    if (quantity === 0) {
      toast.error("Item quantity should not be zero");
      return;
    }

    try {
      const res = await cartService.updateItem({
        id: cartItem.id,
        userId: cartItem.userId,
        bookId: cartItem.book.id,
        quantity,
      });
      if (res) {
        const updatedCartList = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, quantity } : item
        );
        cartContext.updateCart(updatedCartList);
        const updatedPrice =
          totalPrice +
          (inc
            ? parseInt(cartItem.book.price)
            : -parseInt(cartItem.book.price));
        setTotalPrice(updatedPrice);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const placeOrder = async () => {
    if (authContext.user.id) {
      const userCart = await cartService.getList(authContext.user.id);
      if (userCart.length) {
        try {
          let cartIds = userCart.map((element) => element.id);
          const newOrder = {
            userId: authContext.user.id,
            cartIds,
          };
          const res = await orderService.placeOrder(newOrder);
          if (res) {
            cartContext.updateCart();
            navigate("/");
            toast.success(shared.messages.ORDER_SUCCESS);
          }
        } catch (error) {
          toast.error(`Order cannot be placed ${error}`);
        }
      } else {
        toast.error("Your cart is empty");
      }
    }
  };

  const handleDiscount = () => {
    const discountAmount = totalPrice * 0.1;
    const discountedPrice = totalPrice - discountAmount;
    setTotalPrice(discountedPrice);
    toast.success("10% discount applied!");
  };

  return (
    <div className="flex-1 ml-96 mr-96 px-16">
      <Typography
        variant="h4"
        sx={{
          marginTop: "25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          color: "#474747",
        }}
      >
        Cart Page
      </Typography>
      <div className="flex items-center justify-center m-6">
        <div className="border-t-2 border-[#f14d54] w-32"></div>
      </div>
      <div className="flex font-semibold justify-between">
        <Typography variant="h6">
          My Shopping Bag ({itemsInCart} Items)
        </Typography>
        <span>Total Price: {totalPrice}</span>
      </div>
      <div className="flex-1 mt-5">
        {cartList.map((cartItem) => {
          return (
            <div
              className="flex border border-gray-00 rounded-md shadow-lg p-5 mt-4"
              key={cartItem.id}
            >
              <div className="w-32 h-40 overflow-hidden rounded-sm">
                <img
                  src={cartItem.book.base64image}
                  alt="BookImage"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex">
                <div className="flex-1 ml-5">
                  <p className="brand text-xl font-semibold">
                    {cartItem.book.name}
                  </p>
                  <div className="flex mt-16">
                    <Button
                      sx={{
                        color: "white",
                        backgroundColor: "#f14d54",
                        "&:hover": {
                          backgroundColor: "#f14d54", // Change the hover background color
                        },
                        fontWeight: "bold",
                      }}
                      size="small"
                      onClick={() => updateQuantity(cartItem, false)}
                    >
                      -
                    </Button>
                    <span className="border border-gray-400 inline-block w-8 text-center leading-8 mx-2">
                      {cartItem.quantity}
                    </span>
                    <Button
                      sx={{
                        color: "white",
                        backgroundColor: "#f14d54",
                        "&:hover": {
                          backgroundColor: "#f14d54", // Change the hover background color
                        },
                        fontWeight: "bold",
                      }}
                      size="small"
                      onClick={() => updateQuantity(cartItem, true)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex-1 ml-40">
                  <div>
                    <span className="current-price font-semibold text-right">
                      MRP &#8377; {cartItem.book.price}
                    </span>
                  </div>
                  <Button
                    variant="text"
                    sx={{
                      color: "#f14d54",
                      textTransform: "capitalize",
                      marginTop: "100px",
                    }}
                    onClick={() => removeItem(cartItem.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex-1">
        {totalPrice > 1000 && (
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#f14d54",
              "&:hover": {
                backgroundColor: "#f14d54", // Change the hover background color
              },
              marginTop: "50px",
              marginRight:"20px",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
            onClick={handleDiscount}
          >
            Apply 10% Discount
          </Button>
        )}
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#f14d54",
            "&:hover": {
              backgroundColor: "#f14d54", // Change the hover background color
            },
            marginTop: "50px",
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
          onClick={placeOrder}
        >
          Place order
        </Button>
      </div>
    </div>
  );
};

export default Cart;