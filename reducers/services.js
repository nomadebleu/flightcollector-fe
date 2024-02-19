import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  serviceMovie: null,
};

export const servicesSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      console.log('addMovie:', action.payload);
      state.serviceMovie= {
        poster: action.payload.poster_path,
        title: action.payload.title,
        description: action.payload.overview,
      };
    },
    clearMovie:(state) => {
      state.serviceMovie = null;
    },
  },
});

export const { addMovie, clearMovie} = servicesSlice.actions;
export default servicesSlice.reducer;