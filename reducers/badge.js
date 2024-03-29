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
      state.value.push({
        picture: action.payload.picture,
        name: action.payload.name,
        description: action.payload.description,
        points: action.payload.points,
      });
      // state.value=[];
    },
    clearBadges : (state) => {
      state.value = [];
    }
  },
});

export const { addBadge, clearBadges } = badgeSlice.actions;
export default badgeSlice.reducer;
