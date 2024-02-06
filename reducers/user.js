import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    firstname: null,
    lastname: null,
    email: null,
    pictureProfil: null,
    password: null,
    pointsTotal: null,
    badges: [],
    flights: [],
    planes: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
    },
    logout: (state) => {
      state.value.email = null;
      state.value.password = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
