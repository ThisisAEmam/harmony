import { createSlice } from "@reduxjs/toolkit";

export const activeMemberSlice = createSlice({
  name: "member",
  initialState: { anyCardActive: false, index: null },
  reducers: {
    setActiveMember: (state, action) => (state = action.payload),
  },
});

export const { setActiveMember } = activeMemberSlice.actions;

export default activeMemberSlice.reducer;
