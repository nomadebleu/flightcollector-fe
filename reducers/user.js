import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    isConnected: false,
    firstname: null,
    lastname: null,
    mail: null,
    password: null,
    token: null,
    profilPhoto: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.isConnected = true;
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.mail = action.payload.mail;
      state.value.password = action.payload.password;
      state.value.token = action.payload.token;
      state.value.totalPoints = action.payload.totalPoints;
    },
    logout: (state) => {
      state.value.isConnected = false;
      state.value.mail = null;
      state.value.token = null;
    },
    addPhoto: (state, action) => {
      state.value.photos.push(action.payload);
    },
  },
});

export const { login, logout, addPhoto } = userSlice.actions;
export default userSlice.reducer;
