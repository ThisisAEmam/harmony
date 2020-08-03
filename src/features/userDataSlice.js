import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "user data",
  initialState: { name: "Emam", email: "abdoemamofficial@gmail.com", age: "0", createdAt: "2020-08-03TL651", token: "a6dw16a16daw81da6w" },
  reducers: {
    setUserData: (state, action) => (state = action.payload),
  },
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
