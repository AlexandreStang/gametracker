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
        title: string,
        firstReleaseDate: Date,
        coverId: string,
        genres: string[],
        platforms: string[]
    }) {
        return prisma.game.create({
            data: {
                igdbId: data.igdbId,
                slug: data.slug,
                title: data.title,
                firstReleaseDate: data.firstReleaseDate,
                cover: {
                    connect: {id: data.coverId}
                },
                genres: {
                    connect: data.genres.map((id) => ({id}))
                },
                platforms: {
                    connect: data.platforms.map((id) => ({id}))
                }
            }
        })
    }

    static async update(id: string, data: {
        slug?: string,
        title?: string,
        firstReleaseDate?: Date,
        coverId?: string,
        genres?: string[],
        platforms?: string[]
    }) {
        return prisma.game.update({
            where: {id},
            data: {
                title: data.title,
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