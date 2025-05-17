'use server'

import {PlatformIGDB} from "@/api/types";
import {PlatformController} from "@/db/controllers/platformController";
import {Platform} from "@prisma/client";

export async function getPlatformById(id: string): Promise<Platform | null> {
    try {
        return await PlatformController.getById(id)

    } catch (error) {
        console.error("Could not find a platform with this ID: ", error)
        return null
    }
}

export async function createOrUpdatePlatform(data: PlatformIGDB): Promise<Platform | null> {

    try {
        const platform = await PlatformController.getByIgdbId(data.id)

        // Create a new platform inside the database if it doesn't already exist
        if (!platform) {
            return await PlatformController.create({igdbId: data.id, name: data.name})
        }

        // Update the platform inside the database if the IGDB platform has been updated recently
        if (data.updated_at && platform.updatedAt.getTime() < data.updated_at) {
            return await PlatformController.update(platform.id, {name: data.name})
        }

        return platform
    } catch (error) {
        console.error('Error creating or updating platform: ', error)
        return null
    }

}