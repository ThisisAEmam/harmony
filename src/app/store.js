import { configureStore } from "@reduxjs/toolkit";
import ScreenReducer from "../features/screenSlice";
import CurrentPageReducer from "../features/currentPageSlice";
import ModalReducer from "../features/modalSlice";
import LoggedInReducer from "../features/loggedInSlice";
import UserDataReducer from "../features/userDataSlice";

export default configureStore({
  reducer: {
    screen: ScreenReducer,
    currentPage: CurrentPageReducer,
    modal: ModalReducer,
    isLoggedIn: LoggedInReducer,
    userData: UserDataReducer,
  },
});
