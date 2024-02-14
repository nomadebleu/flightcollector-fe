import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value:{
    isConnected: false,
    firstname: null,
    lastname: null,
    mail: null,
    password: null,
    token: null,
    totalPoints: 0,
    badges: null,
    flights: null,
    planes: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state,action) => {
      state.value = { ...state.value, ...action.payload, isConnected: true };
      // Correspond à : state.value.planes = action.payload.planes;
  },
    logout: (state) => {
      state.value.isConnected = false;
      state.value.mail = null;
      state.value.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
