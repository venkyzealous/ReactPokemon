// src/features/auth/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

// We'll check localStorage for an existing token to persist the session
const storedToken = localStorage.getItem('authToken');

const initialState = {
  token: storedToken,
  isAuthenticated: !!storedToken, // True if a token exists, false otherwise
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the token after a successful login
    setCredentials(state, action) {
      const { token } = action.payload;
      localStorage.setItem('authToken', token); // Save token to localStorage
      state.token = token;
      state.isAuthenticated = true;
    },
    // Action to clear the token and log the user out
    logOut(state, action) {
      localStorage.removeItem('authToken'); // Remove token from localStorage
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// Export the actions so we can use them in our components
export const { setCredentials, logOut } = authSlice.actions;

// Export the reducer to be added to our store
export default authSlice.reducer;

// Export selectors for easy access to the state
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthToken = (state) => state.auth.token;