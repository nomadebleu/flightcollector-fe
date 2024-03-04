import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: [],
  flightIds: [],
};

export const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    addFlight: (state, action) => {
      console.log("addFlight:", action.payload);
      state.value = [action.payload];
    },
    addFlightId: (state, action) => {
      const flightId = action.payload;
      state.flightIds.push(flightId);
    },
  },
});

export const { addFlight, addFlightId } = flightSlice.actions;
export default flightSlice.reducer;
