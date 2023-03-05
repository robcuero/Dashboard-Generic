import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const structureSlice = createSlice({
  name: 'structure',
  initialState: {
    userDetail: false
  },
  reducers: {
    setUserDetail: (state, action: PayloadAction<any>) => {
      state.userDetail = action.payload;
    },
   
    resetAll: (state) => {
      state.userDetail = false;
    }
  }
});
export const { setUserDetail, resetAll } = structureSlice.actions;
