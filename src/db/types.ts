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