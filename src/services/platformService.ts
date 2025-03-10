import {PlatformIGDB} from "@/api/types";
import {PlatformController} from "@/controllers/platformController";

export async function createOrUpdatePlatform(data: PlatformIGDB) {

    const platform = await PlatformController.getByIgdbId(data.id)

    // Create a new platform inside the database if it doesn't already exist
    if (!platform) {
        return await PlatformController.create({igdbId: data.id, name: data.name})
    }

    // Update the platform inside the database if the IGDB platform has been updated recently
    if (platform.updatedAt.getTime() < data.updated_at) {
        return await PlatformController.update(platform.id, {name: data.name})
    }

    return platform
}