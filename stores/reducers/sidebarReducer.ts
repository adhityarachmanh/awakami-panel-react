import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  desktopOpen: boolean;
  mobileOpen: boolean;
  isClosing: boolean;
  nestedOpen: { [key: string]: boolean };
}

const initialState: SidebarState = {
  desktopOpen: true,
  mobileOpen: false,
  isClosing: false,
  nestedOpen: {},
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
    toggleNestedOpen: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      state.nestedOpen[key] = !state.nestedOpen[key];
    },
  },
});

export const { toggleDrawer, closeDrawer, transitionEnd, toggleNestedOpen } = drawerSlice.actions;
export default drawerSlice.reducer;