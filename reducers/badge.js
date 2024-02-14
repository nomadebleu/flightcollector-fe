import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value: [],
};

export const badgeSlice = createSlice({
  name: 'badge',
  initialState,
  reducers: {
    addBadge: (state, action) => {
      console.log('addBadge:', action.payload);
      state.value.push(action.payload);
    },
  },
});

export const { addBadge } = badgeSlice.actions;
export default badgeSlice.reducer;
