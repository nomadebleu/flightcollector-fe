import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  flights: {},
};

export const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    addFlight: (state, action) => {
      console.log("addFlight:", action.payload);
      state.value.push({
        flightDate: action.payload.flightDate,
        departure: action.payload.departure,
        arrival: action.payload.arrival,
        airline: action.payload.airline,
        flight: action.payload.flight,
        planes: action.payload.planes,
        live: action.payload.live,
      });
    },
  },
});

export const { addFlight } = flightSlice.actions;
export default badgeSlice.reducer;
