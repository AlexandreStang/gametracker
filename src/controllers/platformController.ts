import {prisma} from "@/lib/prisma";

export class PlatformController {
    static async getById(id: string) {
        return prisma.platform.findUnique({
            where: {id}
        })
    }

    static async getByIgdbId(igdbId: string) {
        return prisma.platform.findUnique({
            where: {igdbId}
        })
    }

    static async getAll() {
        return prisma.platform.findMany()
    }

    static async create(data: {igdbId: string, name: string}) {
        return prisma.platform.create({
            data
        })
    }

    static async update(id: string, data: {name?: string}) {
        return prisma.platform.update({
            where: {id},
            data
        })
    }

    static async delete(id: string) {
        return prisma.platform.delete({
            where: {id}
        })
    }
}