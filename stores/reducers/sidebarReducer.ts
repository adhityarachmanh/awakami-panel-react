import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  desktopOpen: true,
  mobileOpen: false,
  isClosing: false,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      if (!state.isClosing) {
        state.mobileOpen = !state.mobileOpen;
        state.desktopOpen = !state.desktopOpen;
      }
    },
    closeDrawer: (state) => {
      state.isClosing = true;
      state.mobileOpen = false;
      state.desktopOpen = false;
    },
    transitionEnd: (state) => {
      state.isClosing = false;
    },
  },
});

export const { toggleDrawer, closeDrawer, transitionEnd } = drawerSlice.actions;
export default drawerSlice.reducer;