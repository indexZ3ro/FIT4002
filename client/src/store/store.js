import { configureStore } from "@reduxjs/toolkit";
import textButtonReducer from "../features/textButtonSlice";
import iconButtonReducer from "../features/iconButtonSlice";
import sideBarReducer from "../features/sideBarSlice";

export default configureStore({
  reducer: {
    textButton: textButtonReducer,
    iconButton: iconButtonReducer,
    sideBar: sideBarReducer,
  },
});
