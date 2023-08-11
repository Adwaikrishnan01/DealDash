import { configureStore } from '@reduxjs/toolkit';
import authReducer  from './authSlice';
import searchReducer from './searchSlice'
import cartReducer from './cartSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    search:searchReducer,
    cart:cartReducer
  },
});

export default store;