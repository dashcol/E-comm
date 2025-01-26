import { configureStore } from "@reduxjs/toolkit";
import { userReducers } from "../features/Users/redux/user.redux";
import { productReducer } from "../features/prodcuts/redux/product.redux";

const store = configureStore({
  reducer: {
    users: userReducers,
    products: productReducer,
  },
});

export default store;
