import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from '../../types';

// Load user from localStorage if available
const loadUser = (): User | null => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    return JSON.parse(savedUser);
  }
  return null;
};

const initialState: AuthState = {
  user: loadUser(),
  isAuthenticated: !!loadUser(),
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('user');
    },
  },
});

export const { registerSuccess, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;