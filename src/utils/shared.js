// This component exports a collection of utility functions, constants, and data used in the application.
// The `addToCart` function takes a book object and a user ID, and it uses the `cartService` module to add the item to the user's cart, returning a success message if successful.
// The `messages` object contains various string messages used in the application, such as success or error messages for different operations.
// The `LocalStorageKeys` object provides a mapping for keys used in the local storage, specifically for storing user-related data.
// The `NavigationItems` array defines the navigation menu items in the application, including their names, routes, and access permissions based on user roles. 
// The `hasAccess` function is used to check if a user has access to a particular route based on their role and the current pathname.

import cartService from "../service/cart.service";
import { Role } from "./enum";

const addToCart = async (book, id) => {
  return cartService
    .add({
      userId: id,
      bookId: book.id,
      quantity: 1,
    })
    .then((res) => {
      return { error: false, message: "Item added in cart" };
    })
    .catch((e) => {
     
    });
};

const messages = {
  USER_DELETE: "are you sure you want to delete the user?",
  UPDATED_SUCCESS: "Record updated successfully",
  UPDATED_FAIL: "Record cannot be updated",
  DELETE_SUCCESS: "Record deleted successfully",
  DELETE_FAIL: "Record cannot be deleted",
  ORDER_SUCCESS: "Your order is successfully placed",
};

const LocalStorageKeys = {
  USER: "user",
};

const NavigationItems = [
  {
    name: "Users",
    route: "/user",
    access: [Role.Admin, Role.Seller],
  },
  {
    name: "Categories",
    route: "/categories",
    access: [Role.Admin, Role.Seller],
  },
  {
    name: "Book",
    route: "/book",
    access: [Role.Admin, Role.Seller],
  },
  {
    name: "Update Profile",
    route: "/update-profile",
    access: [Role.Admin, Role.Buyer, Role.Seller],
  },
];

const hasAccess = (pathname, user) => {
  const navItem = NavigationItems.find((navItem) =>
    pathname.includes(navItem.route)
  );
  if (navItem) {
    return (
      !navItem.access ||
      !!(navItem.access && navItem.access.includes(user.roleId))
    );
  }
  return true;
};
// eslint-disable-next-line
export default {
  addToCart,
  messages,
  hasAccess,
  NavigationItems,
  LocalStorageKeys,
};
