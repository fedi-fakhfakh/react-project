import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  previousRoute: null,
};

const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    updatePreviousRoute: (state, action) => {
      state.previousRoute = action.payload;
    },
  },
});

export const { updatePreviousRoute } = routerSlice.actions;

export default routerSlice.reducer;
