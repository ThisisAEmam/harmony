import { createSlice } from "@reduxjs/toolkit";

export const currentPageSlice = createSlice({
  name: "current page",
  initialState: "",
  reducers: {
    setCurrentPage: (state, action) => (state = action.payload),
  },
});

export const { setCurrentPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
