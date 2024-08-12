import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthModel } from "@/types/AuthModel";
interface AuthState {
  isAuthenticated: boolean;
  auth: AuthModel | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  auth: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<AuthModel>) => {
      state.isAuthenticated = true;
      state.auth = action.payload;
    },
    deauthenticate: (state) => {
      state.isAuthenticated = false;
      state.auth = null;
    },
  },
});

export const { authenticate, deauthenticate } = authSlice.actions;
export default authSlice.reducer;
