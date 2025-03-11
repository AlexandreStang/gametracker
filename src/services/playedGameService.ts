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

    try {
        const [game, platform] = await Promise.all([
            createOrUpdateGame(data.gameIGDBid),
            PlatformController.getByIgdbId(data.platformIGDBid),
        ]);

        if (!game || !platform) {
            console.warn("Game or platform not found; cannot register played game.");
            return null
        }

        return PlayedGameController.create({
            gameId: game.id,
            platformId: platform.id,
            playtime: data.playtime,
            like: data.like,
            userId: 'cm7xuh4di0000vmxwj7x7am9r',
        })

    } catch (error) {
        console.error('Error registering played game: ', error)
        return null
    }

}
