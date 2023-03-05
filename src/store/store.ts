import{configureStore}from "@reduxjs/toolkit";
import { userDetailSlice } from "./slices/userDetail/formSlice";
import { structureSlice } from "./slices/userDetail/structureSlice";

export const store=configureStore({
    reducer:{
     userDetail:userDetailSlice.reducer,
     structure: structureSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
