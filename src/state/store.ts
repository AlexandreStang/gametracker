import {configureStore} from "@reduxjs/toolkit";
import modalReducer from "@/state/modal/modalSlice"

export const store = configureStore({
    reducer: {
        modalGame: modalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>; // Type for TypeScript
export type AppDispatch = typeof store.dispatch; // Type of dispatch for TypeScript