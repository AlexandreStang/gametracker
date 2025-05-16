'use server'

import {createOrUpdateGame} from "@/db/services/gameService";
import {PlayedGameController} from "@/db/controllers/playedGameController";
import {PlatformController} from "@/db/controllers/platformController";
import {PlayedGame} from "@prisma/client";
import {GamesPerPlatform, PlayedGameFull, PlaytimePerPlatform, SortPlayedGames, UserStatistics} from "@/db/types";

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

export async function getAllFullPlayedGamesFromUser(id: string, sortBy?: SortPlayedGames): Promise<PlayedGameFull[] | null> {
    try {
        if (!sortBy) {
            sortBy = {field: "playtime", order: "desc"}
        }

        return await PlayedGameController.getAllFromUser(id, sortBy);
    } catch (error) {
        console.error('Error finding played games from user: ', error)
        return null
    }
}

export async function getStatisticsFromUser(id: string): Promise<any | null> {
    try {
        // Get data from database
        const totalGamesDB = await PlayedGameController.getTotalGamesFromUser(id);
        const gamesPerPlatformDB = await PlayedGameController.getTotalGamesPerPlatformFromUser(id);
        const totalPlaytimeDB = await PlayedGameController.getTotalPlaytimeFromUser(id);
        const playtimePerPlatformDB = await PlayedGameController.getTotalPlaytimePerPlatformFromUser(id);
        const averagePlaytimePerPlatformDB = await PlayedGameController.getAveragePlaytimePerPlatformFromUser(id);

        // Assign platform data to game and playtime stats
        const gamesPerPlatform = (await Promise.all(
            gamesPerPlatformDB.map(async (platformStats) => {
                const platform = await PlatformController.getById(platformStats.platformId);
                if (platform) return {platformName: platform.name, totalGames: platformStats._count.gameId};
                return null
            })
        )).filter(Boolean) as GamesPerPlatform[]

        const playtimePerPlatform = (await Promise.all(
            playtimePerPlatformDB.map(async (platformStats) => {
                const platform = await PlatformController.getById(platformStats.platformId);

                if (!platform) return null

                const averagePlaytime = averagePlaytimePerPlatformDB.find(
                    (avg) => avg.platformId === platformStats.platformId
                    // (avg) is the first element in the array that fits the criteria
                )

                return {
                    platformName: platform.name,
                    totalPlaytime: platformStats._sum.playtime,
                    avgPlaytime: averagePlaytime?._avg.playtime ?? 0
                };
            })
        )).filter(Boolean) as PlaytimePerPlatform[]

        // Assemble and return user statistics
        const totalPlatform: number = gamesPerPlatform.length

        const userStatistics: UserStatistics = {
            games: {
                total: totalGamesDB,
                perPlatform: gamesPerPlatform,
                avgPerPlatform: totalGamesDB / totalPlatform
            },
            playtime: {
                total: totalPlaytimeDB ? totalPlaytimeDB : 0,
                perPlatform: playtimePerPlatform,
                avgPerGame: totalPlaytimeDB ? totalPlaytimeDB / totalGamesDB : 0
            },
            platforms: {
                total: totalPlatform
            }
        }

        return (userStatistics)

    } catch (error) {
        console.error('Error finding statistics from user: ', error)
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

export async function updateLikePlayedGame(id: string, like: boolean): Promise<PlayedGame | null> {
    try {
        return PlayedGameController.update(id, {
            like: like
        })
    } catch (error) {
        console.error('Error updating played game like status:', error)
        return null
    }
}

export async function deletePlayedGame(id: string): Promise<PlayedGame | null> {
    try {
        return await PlayedGameController.delete(id)
    } catch (error) {
        console.error('Error deleting played game: ', error)
        return null
    }
}
