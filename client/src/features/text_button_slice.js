import { createSlice } from "@reduxjs/toolkit";

const buttons = [
  { id: "signUp", label: "Sign Up" },
  { id: "logIn", label: "Log In" },
  { id: "create", label: "Create" },
  { id: "join", label: "Join" },
  { id: "start", label: "Start " },
  { id: "update", label: "Update" },
  { id: "deleteAccount", label: "Delete Account" },
  { id: "submit", label: "Submit" },
];

const initialState = {};
buttons.forEach((button) => {
  initialState[button.id] = button.label;
});

const buttonSlice = createSlice({
  name: "buttonLabels",
  initialState,
  reducers: {},
});

// export const { setButtonLabel} = buttonSlice.actions;
export default buttonSlice.reducer;
