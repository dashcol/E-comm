import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase.config/firebase.config";

const initialState = {
  isAuthenticated: false,
  email: "",
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

export const resetPasswordThunk = createAsyncThunk(
  "user/resetPassword",
  async ({ email, newPassword }, thunkAPI) => {
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return thunkAPI.rejectWithValue("User not found");
      }

      const userDoc = querySnapshot.docs[0].ref;
      const newpass = await updateDoc(userDoc, { password: newPassword });
      console.log(newpass);

      return "Password updated successfully";
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update password");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
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
        state.isAuthenticated = false;
      })
      .addCase(userSignupThunk.rejected, (state, action) => {
        state.error = action.payload || "Signup failed";
      })
      .addCase(resetPasswordThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.error = action.payload || "Unable to change Password";
      });
  },
});

export default userSlice.reducer;

export const { setEmail, logout, resetState } = userSlice.actions;
export const userSelector = (state) => state.users;
