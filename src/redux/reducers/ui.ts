import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  isLoginDialogOpen: boolean;
};

const initialState: UiState = {
  isLoginDialogOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleLoginDialog: (state, action: PayloadAction<boolean>) => {
      state.isLoginDialogOpen = action.payload;
    },
  },
});

export const { toggleLoginDialog } = uiSlice.actions;
export default uiSlice.reducer;
