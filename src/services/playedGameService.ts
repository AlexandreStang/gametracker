'use server'

import {createOrUpdateGame} from "@/services/gameService";

export interface PlayedGameFormData {
    gameIGDBid: number,
    platformIGDBid: number,
    playtime: number,
    like: boolean
}

export async function registerPlayedGame(data: PlayedGameFormData) {

    const game = createOrUpdateGame(data.gameIGDBid)

}
