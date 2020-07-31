import { createSlice } from "@reduxjs/toolkit";

export const loggedInSlice = createSlice({
  name: "logged in",
  initialState: true,
  reducers: {
    setLoggedIn: (state, action) => (state = action.payload),
  },
});

export const { setLoggedIn } = loggedInSlice.actions;

export default loggedInSlice.reducer;
