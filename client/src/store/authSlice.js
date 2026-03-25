import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // We initialize with a mock student user so the app continues working as before
  user: {
    id: "student_001",
    name: "Test Student",
  },
  isAdmin: false,
  isAuthenticated: true, // We pretend they are logged in for now
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin || false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isAdmin = false;
    },
    toggleAdminMode: (state) => {
      // Just a temporary helper for testing your admin UI on the frontend
      state.isAdmin = !state.isAdmin;
    }
  },
});

export const { login, logout, toggleAdminMode } = authSlice.actions;
export default authSlice.reducer;
