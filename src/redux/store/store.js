import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import routerReducer from '../slices/routerSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    router: routerReducer,
  },
});

export default store;
