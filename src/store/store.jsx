import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../features/prodcuts/redux/product.redux";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import userReducers from "../features/Users/redux/user.redux";
import { themeReducer } from "../features/theme/theme.reducers/theme.reducers";

const sessionStorage = createWebStorage("session");
const combineStore = combineReducers({
  theme: themeReducer,
  users: userReducers,
  products: productReducer,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, combineStore);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});

const persistor = persistStore(store);

export { store, persistor };
