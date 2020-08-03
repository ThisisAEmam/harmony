import { createSlice } from "@reduxjs/toolkit";
const init = localStorage.getItem("isLoggedIn") === "true";

export const loggedInSlice = createSlice({
  name: "logged in",
  initialState: init,
  reducers: {
    setLoggedIn: (state, action) => (state = action.payload),
  },
});

export const { setLoggedIn } = loggedInSlice.actions;

export default loggedInSlice.reducer;
