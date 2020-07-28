import { configureStore } from "@reduxjs/toolkit";
import ScreenReducer from "../features/screenSlice";
import CurrentPageReducer from "../features/currentPageSlice";

export default configureStore({
  reducer: {
    screen: ScreenReducer,
    currentPage: CurrentPageReducer,
  },
});
