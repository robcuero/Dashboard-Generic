import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userDetailSlice = createSlice({
  name: 'form',
  initialState: {
    idSelect: null,
    userDetail: []
  },
  reducers: {
    setAll: (state, action: PayloadAction<any>) => {
      state.userDetail = action.payload;
    },
    setIdSelect: (state, action: PayloadAction<any>) => {
      state.idSelect = action.payload;
    },
    resetAll: (state) => {
      state.userDetail = [];
    }
  }
});
export const { setAll, resetAll,setIdSelect } = userDetailSlice.actions;
