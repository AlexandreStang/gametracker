import {configureStore} from "@reduxjs/toolkit";
import modalGameReducer from "@/state/modalGame/modalGameSlice"

export const store = configureStore({
    reducer: {
        modalGame: modalGameReducer
    }
})

export type RootState = ReturnType<typeof store.getState>; // Type for TypeScript
export type AppDispatch = typeof store.dispatch; // Type of dispatch for TypeScript