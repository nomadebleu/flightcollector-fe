import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value: [],
};

export const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    addFlight: (state, action) => {
      console.log('addFlight:', action.payload);
      state.value.push(action.payload);
    },
  },
});

export const { addFlight } = flightSlice.actions;
export default flightSlice.reducer;
