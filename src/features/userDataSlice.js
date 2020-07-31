import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "user data",
  initialState: { name: "AbdelRahman", email: "abdoemamofficial@gmail.com", token: "a516d8aw8d1asda8w" },
  reducers: {
    setUserData: (state, action) => (state = action.payload),
  },
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
