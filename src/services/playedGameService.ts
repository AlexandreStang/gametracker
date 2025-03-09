'use server'

import {GameController} from "@/controllers/gameController";

export interface PlayedGameFormData {
    gameIgbdId: number,
    platformIgdbId: number,
    playtime: number,
    like: boolean
}

export async function registerPlayedGame(data: PlayedGameFormData) {
    console.log("hello??")

    // Verify if the game is already in the database
    const game = await GameController.getByIgdbId(data.gameIgbdId)

    console.log(game)

    return game
}
