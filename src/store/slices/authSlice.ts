import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;