import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ModalGameState {
    isOpen: boolean
    mode: 'add' | 'edit' | null
    igdbId?: number | null // For adding games
    gameId?: string | null // For editing games
    userId: string | null
}

const initialState: ModalGameState = {
    isOpen: false,
    mode: null,
    igdbId: null,
    gameId: null,
    userId: null
}

const modalGameSlice = createSlice({
    name: "modalGame",
    initialState,
    reducers: {
        openGameModal(state, action: PayloadAction<{
            mode: 'add' | 'edit';
            igdbId?: number;
            gameId?: string;
            userId: string
        }>) {
            state.isOpen = true;
            state.mode = action.payload.mode;
            state.igdbId = action.payload.igdbId;
            state.gameId = action.payload.gameId;
            state.userId = action.payload.userId;
        },
        closeGameModal(state) {
            state.isOpen = false;
            state.mode = null;
            state.igdbId = null;
            state.gameId = null;
            state.userId = null;
        }
    }
})

export const {openGameModal, closeGameModal} = modalGameSlice.actions;
export default modalGameSlice.reducer;