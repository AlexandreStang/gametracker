import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {act} from "react";

interface ModalGameState {
    isOpen: boolean
    mode: 'add' | 'edit' | null
    igdbId?: number | null // For adding games
    playedGameId?: string | null // For editing games
}

const initialState: ModalGameState = {
    isOpen: false,
    mode: null,
    igdbId: null,
    playedGameId: null
}

const modalGameSlice = createSlice({
    name: "modalGame",
    initialState,
    reducers: {
        openGameModal(state, action: PayloadAction<{
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
        closeGameModal(state) {
            state.isOpen = false;
            state.mode = null;
            state.igdbId = null;
            state.playedGameId = null;
        }
    }
})

export const {openGameModal, closeGameModal} = modalGameSlice.actions;
export default modalGameSlice.reducer;