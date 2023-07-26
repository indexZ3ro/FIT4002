import { configureStore } from "@reduxjs/toolkit";
import textButtonReducer from "../features/text_button_slice";
import sideBarReducer from "../features/sidebar_slice";

export default configureStore({
  reducer: {
    textButton: textButtonReducer,
    sideBar: sideBarReducer,
  },
});
