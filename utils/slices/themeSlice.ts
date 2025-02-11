import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: 'dark'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = state.darkMode === 'dark' ? 'light' : 'dark';
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;