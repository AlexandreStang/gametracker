import {prisma} from "@/lib/prisma";

export class GenreController {
    static async getById(id: string) {
        return prisma.genre.findUnique({
            where: {id}
        })
    }

    static async getByIgdbId(igdbId: number) {
        return prisma.genre.findUnique({
            where: {igdbId}
        })
    }

    static async getAll() {
        return prisma.genre.findMany()
    }

    static async create(data: {igdbId: number, name: string}) {
        return prisma.genre.create({
            data
        })
    }

    static async update(id: string, data: {name?: string}) {
        return prisma.genre.update({
            where: {id},
            data
        })
    }

    static async delete(id: string) {
        return prisma.genre.delete({
            where: {id}
        })
    }
}