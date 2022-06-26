import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import web3Reducers from './web3Reducers';

export default configureStore({
  reducer: {
    counter: counterReducer,
    accounter: web3Reducers,
  },
  middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
})