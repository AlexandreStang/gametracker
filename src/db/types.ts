export interface PlayedGame {
    id: string,
    gameId: string,
    platformId: string,
    playtime: number,
    like: boolean,
    userId: string,
    createdAt: Date,
    updatedAt: Date
}