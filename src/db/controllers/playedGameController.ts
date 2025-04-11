import {prisma} from "@/lib/prisma";

export class PlayedGameController {
    static async getById(id: string) {
        return prisma.playedGame.findUnique({
            where: {id}
        })
    }

    static async getAll() {
        return prisma.playedGame.findMany()
    }

    static async getAllFromUser(id: string) {
        return prisma.playedGame.findMany({
            where: {
                userId: id
            },
            include: {
                game: true,
                platform: true
            }
        })
    }

    static async getTotalPlaytimeFromUser(id: string) {
        const total = await prisma.playedGame.aggregate({
            where: {
                userId: id
            },
            _sum: {
                playtime: true
            }
        })

        return total._sum.playtime
    }

    static async create(data: {
        gameId: string,
        platformId: string,
        playtime: number,
        like: boolean,
        userId: string
    }) {
        return prisma.playedGame.create({
            data: {
                game: {
                    connect: {id: data.gameId}
                },
                platform: {
                    connect: {id: data.platformId}
                },
                playtime: data.playtime,
                like: data.like,
                user: {
                    connect: {id: data.userId}
                }
            }
        })
    }

    static async update(id: string, data: {
        platformId?: string,
        playtime?: number,
        like?: boolean
    }) {
        return prisma.playedGame.update({
            where: {id},
            data: {
                platform: data.platformId ? {
                    connect: {id: data.platformId}
                } : undefined,
                playtime: data.playtime,
                like: data.like
            }
        })
    }

    static async delete(id: string) {
        return prisma.playedGame.delete({
            where: {id}
        })
    }

    static async hasPlayedGameOnPlatform(data: {userId: string, gameIgdbId: number, platformIgdbId: number}) {
        const playedGame = await prisma.playedGame.findFirst({
            where: {
                userId: data.userId,
                game: {
                    igdbId: data.gameIgdbId
                },
                platform: {
                    igdbId: data.platformIgdbId
                }
            }
        })

        return Boolean(playedGame)
    }
}