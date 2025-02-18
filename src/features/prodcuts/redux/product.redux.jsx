import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase.config/firebase.config";

const initialState = {
  loading: false,
  products: [],
  error: null,
  cart: [],
  orders: [],
};

export const productAsyncThunk = createAsyncThunk(
  "products/all",
  async (arg, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      let products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const serachAsyncThunk = createAsyncThunk(
  "products/search",
  async (searchValue, thunkAPI) => {
    try {
      if (!searchValue) {
        const querySnapshot = await getDocs(collection(db, "products"));
        return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      }
      const productsRef = collection(db, "products");
      const q = query(
        productsRef,
        where("name", ">=", searchValue),
        where("name", "<=", searchValue + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);
      const searchedProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return searchedProducts;
    } catch (error) {
      console.error("Error in search:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const filterAsyncThunk = createAsyncThunk(
  "products/filter",
  async (value, thunkAPI) => {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("price", "<=", Number(value)));
      const querySnapshot = await getDocs(q);
      const filteredProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return filteredProducts;
    } catch (error) {
      console.error("Error in Filter:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const categoryAsyncThunk = createAsyncThunk(
  "products/category",
  async (arg, thunkAPI) => {
    try {
      const productRef = collection(db, "products");
      const q = query(productRef, where("category", "==", arg));
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return products;
    } catch (error) {
      console.error("Error in Filter:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      if (!state.cart.some((item) => item.id === action.payload.id)) {
        state.cart.push(action.payload);
      }
    },
    resetCart: (state) => {
      return initialState;
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    orders: (state) => {
      state.orders = [...state.orders, ...state.cart];

      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productAsyncThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(productAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(productAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(serachAsyncThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(serachAsyncThunk.fulfilled, (state, action) => {
        state.products = action.payload;

        state.loading = false;
      })
      .addCase(serachAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(filterAsyncThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(filterAsyncThunk.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(filterAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(categoryAsyncThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(categoryAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(categoryAsyncThunk.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
export const productSelector = (state) => state.products.products;
