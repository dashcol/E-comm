import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: localStorage.getItem("darkMode") === "true",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem("darkMode", state.isDark);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
