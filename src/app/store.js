import { configureStore } from "@reduxjs/toolkit";
import ScreenReducer from "../features/screenSlice";
import CurrentPageReducer from "../features/currentPageSlice";
import ModalReducer from "../features/modalSlice";

export default configureStore({
  reducer: {
    screen: ScreenReducer,
    currentPage: CurrentPageReducer,
    modal: ModalReducer,
  },
});
