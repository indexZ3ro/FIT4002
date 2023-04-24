import { configureStore } from '@reduxjs/toolkit'
import textButtonReducer from '../features/textButtonSlice'
import iconButtonReducer from '../features/iconButtonSlice'

export default configureStore({
  reducer: {
    textButton: textButtonReducer,
    iconButton: iconButtonReducer,

  },
})