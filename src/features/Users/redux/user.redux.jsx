import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase.config/firebase.config";

const initialState = {
  isAuthenticated: false,
  data: null,
  loading: false,
  error: null,
};

export const userAsyncThunk = createAsyncThunk(
  "user/login",
  async (userCred, thunkAPI) => {
    try {
      const userrRef = collection(db, "users");
      const q = query(
        userrRef,
        where("email", "==", userCred.email),
        where("password", "==", userCred.password)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return thunkAPI.rejectWithValue("Invalid Credentials");
      }
      const user = querySnapshot.docs[0].data();
      console.log(user);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const userSignupThunk = createAsyncThunk(
  "user/signup",
  async (creds, thunkAPI) => {
    try {
      await addDoc(collection(db, "users"), creds);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue("not added to the DB");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      return { ...initialState };
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAsyncThunk.pending, (state, action) => {
        state.isAuthenticated = false;
        state.loading = true;
      })
      .addCase(userAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.data = action.payload;
      })
      .addCase(userAsyncThunk.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload || "Invalid credentials";
      })
      .addCase(userSignupThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userSignupThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
      })
      .addCase(userSignupThunk.rejected, (state, action) => {
        state.error = action.payload || "Signup failed";
      });
  },
});

export default userSlice.reducer;

export const { logout, resetState } = userSlice.actions;
export const userSelector = (state) => state.users;
