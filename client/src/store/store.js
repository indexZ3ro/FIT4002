import { configureStore } from "@reduxjs/toolkit";
import textButtonReducer from "../features/textButtonSlice";
import sideBarReducer from "../features/sideBarSlice";

export default configureStore({
  reducer: {
    textButton: textButtonReducer,
    sideBar: sideBarReducer,
  },
});
