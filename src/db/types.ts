import { Prisma } from "@prisma/client";

export type PlayedGameFull = Prisma.PlayedGameGetPayload<{
    include: {
        game: true,
        platform: true
    }
}>

export interface SortPlayedGames {
    field: 'game.name' | 'game.firstReleaseDate' | 'platform.name' | 'playtime' | 'updatedAt'
    order: 'asc' | 'desc'
}

export interface UserStatistics {
    games: {
        total: number
        perPlatform: (GamesPerPlatform | null)[]
        avgPerPlatform: number
    }
    playtime: {
        total: number
        perPlatform: (PlaytimePerPlatform | null)[]
        avgPerGame: number
    }
    platforms: {
        total: number
    }
    // genres: {
    //     byPlaytime: ()[]
    // }
}

export interface GamesPerPlatform {
    platformName: string
    totalGames: number
}

export interface PlaytimePerPlatform {
    platformName: string
    totalPlaytime: number
    avgPlaytime: number
}