import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    isConnected: false,
    firstname: null,
    lastname: null,
    mail: null,
    password: null,
    token: null,
    pictureProfil: null,
    totalPoints: 0,
    badges: [],
    flights: [],
    planes: [],
    _id: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = { ...state.value, ...action.payload, isConnected: true };
      // Correspond à : state.value.planes = action.payload.planes;
    },
    logout: (state) => {
      state.value.isConnected = false;
      state.value.mail = null;
      state.value.token = null;
    },
    addPhoto: (state, action) => {
      state.value.pictureProfil = action.payload;
    },
    addPoints: (state, action) => {
      state.value.totalPoints = action.payload;
    },
  },
});

export const { login, logout, addPhoto, addPoints } = userSlice.actions;
export default userSlice.reducer;
