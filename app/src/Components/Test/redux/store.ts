// src/components/Test/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import testReducer from '../redux/testSlice'; // Import the test slice reducer

const store = configureStore({
  reducer: {
    test: testReducer, // Add your reducer to the store
  },
});

// Define RootState type for use with selectors
export type RootState = ReturnType<typeof store.getState>;

export default store;