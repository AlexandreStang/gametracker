'use server'

import {createOrUpdateGame} from "@/db/services/gameService";
import {PlayedGameController} from "@/db/controllers/playedGameController";
import {PlatformController} from "@/db/controllers/platformController";

export interface PlayedGameFormData {
    gameIgdbId: number,
    platformIgdbId: number,
    playtime: number,
    like: boolean
}

export async function registerPlayedGame(data: PlayedGameFormData) {

    try {
        const hasPlayedGame = await PlayedGameController.hasPlayedGameOnPlatform({
            userId: 'cm7xuh4di0000vmxwj7x7am9r',
            gameIgdbId: data.gameIgdbId,
            platformIgdbId: data.platformIgdbId
        })

        if (hasPlayedGame) {
            console.error("You already have this game on this platform");
            return null
        }

        const [game, platform] = await Promise.all([
            createOrUpdateGame(data.gameIgdbId),
            PlatformController.getByIgdbId(data.platformIgdbId),
        ]);

        if (!game || !platform) {
            console.error("Game or platform not found; cannot register played game.");
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

export async function getAllFromUser(id: string) {
    try {
        return await PlayedGameController.getAllFromUser(id);
    } catch (error) {
        console.error('Error finding played games from user: ', error)
        return null
    }
}
