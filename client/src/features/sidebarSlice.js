import { createSlice } from '@reduxjs/toolkit'

const sideBarSlice = createSlice({
  name: 'buttonLabels',
  initialState: {
    sideBar: true
  },
  reducers: {
    showSideBar: (state) => {
      state.sideBar = true
    },
    hideSideBar: (state) => {
      state.sideBar = false
    }
  }
})

export const { showSideBar, hideSideBar } = sideBarSlice.actions
export default sideBarSlice.reducer
