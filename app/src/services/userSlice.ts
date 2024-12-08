import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface UserState {
  id: string | null;
  email: string | null;
  firstName: string | null;
  token: string | null;
  premiumUser: boolean;
}

const initialState: UserState = {
  id: null,
  email: null,
  firstName: null,
  token: null,
  premiumUser: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.token = action.payload.token;
      state.premiumUser = action.payload.premiumUser; // Correctly updating premiumUser
    },
    clearUser(state) {
      state.id = null;
      state.email = null;
      state.firstName = null;
      state.token = null;
      state.premiumUser = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
