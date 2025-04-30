'use server'

import {createOrUpdateGame} from "@/db/services/gameService";
import {PlayedGameController} from "@/db/controllers/playedGameController";
import {PlatformController} from "@/db/controllers/platformController";
import {PlayedGame} from "@prisma/client";
import {PlayedGameFull} from "@/db/types";

export interface createPlayedGameFormData {
    gameIgdbId: number,
    platformIgdbId: number,
    playtime: number,
    like: boolean,
    userId: string
}

export interface updatePlayedGameFormData {
    playedGameId: string,
    platformIgdbId: number,
    playtime: number,
    like: boolean,
}

export async function getPlayedGameById(id: string): Promise<PlayedGame | null> {
    try {
        return await PlayedGameController.getById(id);
    } catch (error) {
        console.error('Error finding played game from id: ', id);
        return null
    }
}

export async function getFullPlayedGameById(id: string): Promise<PlayedGameFull | null> {
    try {
        return await PlayedGameController.getFullById(id);
    } catch (error) {
        console.error('Error finding played game from id: ', id);
        return null
    }
}

export async function getAllFullPlayedGamesFromUser(id: string): Promise<PlayedGameFull[] | null> {
    try {
        return await PlayedGameController.getAllFromUser(id);
    } catch (error) {
        console.error('Error finding played games from user: ', error)
        return null
    }
}

export async function getTotalPlaytimeFromUser(id: string): Promise<number | null> {
    try {
        return await PlayedGameController.getTotalPlaytimeFromUser(id);
    } catch (error) {
        console.error('Error finding total playtime from user: ', error)
        return null
    }
}

export async function createPlayedGame(data: createPlayedGameFormData): Promise<PlayedGame | null> {

    try {
        const hasPlayedGame = await PlayedGameController.hasPlayedGameOnPlatform({
            userId: data.userId,
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
            userId: data.userId,
        })

    } catch (error) {
        console.error('Error registering played game: ', error)
        return null
    }

}

export async function updatePlayedGame(data: updatePlayedGameFormData): Promise<PlayedGame | null> {
    try {

        const platform = await PlatformController.getByIgdbId(data.platformIgdbId);

        if (!platform) {
            console.error("Platform not found; cannot update played game.");
            return null
        }

        return PlayedGameController.update(data.playedGameId, {
            platformId: platform.id,
            playtime: data.playtime,
            like: data.like
        })

    } catch (error) {
        console.error('Error updating played game: ', error)
        return null
    }
}
