import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: { shown: false, type: "" },
  reducers: {
    setModal: (state, action) => (state = action.payload),
  },
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
