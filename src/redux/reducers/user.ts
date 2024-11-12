import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userState = {
  email: string | null;
  name: string | null;
  id: string | null;
};

const initialState: userState = {
  email: null,
  name: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (
      state,
      action: PayloadAction<{ email: string; name: string; id: string }>,
    ) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    clearUserDetails: (state) => {
      state.email = null;
      state.name = null;
      state.id = null;
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
