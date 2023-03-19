import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userDetailSlice = createSlice({
  name: 'form',
  initialState: {
    idSelect: null,
    userDetail: {cliente:null,suscripciones:null}
  },
  reducers: {
    setAll: (state, action: PayloadAction<any>) => {
      console.log(action.payload)
      state.userDetail = action.payload;
    },
    setIdSelect: (state, action: PayloadAction<any>) => {
      state.idSelect = action.payload;
    },
    setClient: (state, action: PayloadAction<any>) => {

      state.userDetail.cliente = action.payload;
    },
    resetAll: (state) => {
      state.userDetail = {cliente:null,suscripciones:null};
    }
  }
});
export const { setAll, resetAll,setIdSelect ,setClient} = userDetailSlice.actions;
