import { configureStore } from "@reduxjs/toolkit";
import ScreenReducer from "../features/screenSlice";

export default configureStore({
  reducer: {
    screen: ScreenReducer,
  },
});
