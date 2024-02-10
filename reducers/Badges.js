import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  badges: [],
};

const badgeSlice = createSlice({
  name: 'badges',
  initialState,
  reducers: {
    addBadge: (state, action) => {
      state.badges.push(action.payload);
    },
    removeBadge: (state, action) => {
      state.badges = state.badges.filter(badge => badge.id !== action.payload);
    },
    updateBadges: (state, action) => {
      state.badges = action.payload;
    },
  },
});

export const { addBadge, removeBadge, updateBadges } = badgeSlice.actions;

export default badgeSlice.reducer;