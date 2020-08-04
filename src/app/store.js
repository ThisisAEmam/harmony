import { configureStore } from "@reduxjs/toolkit";
import ScreenReducer from "../features/screenSlice";
import CurrentPageReducer from "../features/currentPageSlice";
import ModalReducer from "../features/modalSlice";
import LoggedInReducer from "../features/loggedInSlice";

export default configureStore({
  reducer: {
    screen: ScreenReducer,
    currentPage: CurrentPageReducer,
    modal: ModalReducer,
    isLoggedIn: LoggedInReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
