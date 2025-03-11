'use server'

import {createOrUpdateGame} from "@/services/gameService";
import {PlayedGameController} from "@/controllers/playedGameController";
import {PlatformController} from "@/controllers/platformController";

export interface PlayedGameFormData {
    gameIGDBid: number,
    platformIGDBid: number,
    playtime: number,
    like: boolean
}

export async function registerPlayedGame(data: PlayedGameFormData) {

    const game = await createOrUpdateGame(data.gameIGDBid)
    const platform = await PlatformController.getByIgdbId(data.platformIGDBid)

    return await PlayedGameController.create({
        gameId: game.id,
        platformId: platform ? platform.id : '',
        playtime: data.playtime,
        like: data.like,
        userId: 'cm7xuh4di0000vmxwj7x7am9r',
    })

}
