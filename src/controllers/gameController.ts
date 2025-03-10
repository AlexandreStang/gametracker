import {prisma} from "@/lib/prisma";

export class GameController {
    static async getById(id: string) {
        return prisma.game.findUnique({
            where: {id}
        })
    }

    static async getByIgdbId(igdbId: number) {
        return prisma.game.findUnique({
            where: {igdbId}
        })
    }

    static async getAll() {
        return prisma.game.findMany()
    }

    static async create(data: {
        igdbId: number,
        slug: string,
        name: string,
        firstReleaseDate: Date,
        coverId?: string,
        genresId: string[],
        platformsId: string[]
    }) {
        return prisma.game.create({
            data: {
                igdbId: data.igdbId,
                slug: data.slug,
                name: data.name,
                firstReleaseDate: data.firstReleaseDate,
                cover: data.coverId ? {
                    connect: {id: data.coverId}
                } : {},
                genres: {
                    connect: data.genresId.map((id) => ({id}))
                },
                platforms: {
                    connect: data.platformsId.map((id) => ({id}))
                }
            }
        })
    }

    static async update(id: string, data: {
        slug?: string,
        name?: string,
        firstReleaseDate?: Date,
        coverId?: string,
        genres?: string[],
        platforms?: string[]
    }) {
        return prisma.game.update({
            where: {id},
            data: {
                name: data.name,
                slug: data.slug,
                firstReleaseDate: data.firstReleaseDate,
                cover: data.coverId ? {
                    connect: {id: data.coverId}
                } : undefined,
                genres: data.genres ? {
                    set: data.genres.map((id) => ({id}))
                } : undefined,
                platforms: data.platforms ? {
                    set: data.platforms.map((id) => ({id}))
                } : undefined
            }
        })
    }

    static async delete(id: string) {
        return prisma.game.delete({
            where: {id}
        })
    }
}