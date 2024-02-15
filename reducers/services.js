import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value: {},
};

export const servicesSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      console.log('addMovie:', action.payload);
      state.value= {
        poster: action.payload.poster_path,
        title: action.payload.title,
        description: action.payload.overview,
      };
     
    },
  },
});

export const { addMovie} = servicesSlice.actions;
export default servicesSlice.reducer;