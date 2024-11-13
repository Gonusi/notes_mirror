import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  isLoginDialogOpen: boolean;
  isSignupDialogOpen: boolean;
};

const initialState: UiState = {
  isLoginDialogOpen: false,
  isSignupDialogOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleLoginDialog: (state, action: PayloadAction<boolean>) => {
      state.isLoginDialogOpen = action.payload;
    },
    toggleSignupDialog: (state, action: PayloadAction<boolean>) => {
      state.isSignupDialogOpen = action.payload;
    },
  },
});

export const { toggleLoginDialog, toggleSignupDialog } = uiSlice.actions;
export default uiSlice.reducer;
