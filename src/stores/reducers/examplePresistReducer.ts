import { createSlice } from "@reduxjs/toolkit";

export const persistSlice = createSlice({
  name: "persist",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = persistSlice.actions;
export default persistSlice.reducer;
