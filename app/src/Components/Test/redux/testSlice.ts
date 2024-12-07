import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state shape
interface TestState {
  currentTestIndex: number | null; // Can be null initially until a test index is set
  allTestIds: string[]; // Array of test IDs
}

const initialState: TestState = {
  currentTestIndex: null, // Default is null until set
  allTestIds: [], // Initially, the list of test IDs is empty
};

// Create a slice of the Redux store
const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    // Action to set the current test index
    setCurrentTestIndex(state, action: PayloadAction<number>) {
      state.currentTestIndex = action.payload;
    },
    // Action to set the list of test IDs
    setAllTestIds(state, action: PayloadAction<string[]>) {
      state.allTestIds = action.payload;
    },
    // Action to reset the test state
    resetTestState(state) {
      state.currentTestIndex = null;
      state.allTestIds = [];
    },
  },
});

// Export the actions
export const { setCurrentTestIndex, setAllTestIds, resetTestState } = testSlice.actions;

// Export the reducer to be added to the store
export default testSlice.reducer;