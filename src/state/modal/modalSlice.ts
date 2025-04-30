import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {act} from "react";

interface ModalState {
    isOpen: boolean
    mode: 'add' | 'edit' | null
    igdbId?: number | null // For adding games
    playedGameId?: string | null // For editing games
}

const initialState: ModalState = {
    isOpen: false,
    mode: null,
    igdbId: null,
    playedGameId: null
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<{
            mode: 'add' | 'edit';
            igdbId?: number;
            gameId?: string;
            playedGameId?: string;
        }>) {
            state.isOpen = true;
            state.mode = action.payload.mode;
            state.igdbId = action.payload.igdbId;
            state.playedGameId = action.payload.playedGameId;
        },
        closeModal(state) {
            state.isOpen = false;
            state.mode = null;
            state.igdbId = null;
            state.playedGameId = null;
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;