import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const allUserSlice = createSlice({
  name: 'userSuscription',
  initialState: {
    idSuscription:null,
    suscription:null,
    userSuscription: []
  },
  reducers: {
    setUserSuscription: (state, action: PayloadAction<any>) => {
      state.userSuscription = action.payload;
    },
    setSuscription: (state, action: PayloadAction<any>) => {
      state.idSuscription = action.payload.id;
      state.suscription = action.payload.nombre;
    },
   
    resetAll: (state) => {
      state.userSuscription = [];
    }
  }
});
export const { setUserSuscription, resetAll,setSuscription } = allUserSlice.actions;
