import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.id = action.payload.id;
    },
  },
});

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;
