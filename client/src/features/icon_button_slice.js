import { createSlice } from '@reduxjs/toolkit';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';

const buttons = [
  { id: 'sideBar', icon: <GiHamburgerMenu/>},
  { id: 'profile', icon: <CgProfile/>},
]

const initialState = {};
buttons.forEach(button => {
  initialState[button.id] = button.icon;
});

const buttonSlice = createSlice({
  name: 'buttonIcon',
  initialState,
  reducers: {
  },
});


// export const { setButtonLabel} = buttonSlice.actions;
export default buttonSlice.reducer;