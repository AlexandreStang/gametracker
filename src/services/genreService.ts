'use server'

import {GenreIGDB} from "@/api/types";
import {GenreController} from "@/controllers/genreController";

export async function createOrUpdateGenre(data: GenreIGDB) {

    try {
        const genre = await GenreController.getByIgdbId(data.id)

        // Create a new genre inside the database if it doesn't already exist
        if (!genre) {
            return await GenreController.create({igdbId: data.id, name: data.name})
        }

        // Update the genre inside the database if the IGDB genre has been updated recently
        if (genre.updatedAt.getTime() < data.updated_at) {
            return await GenreController.update(genre.id, {name: data.name})
        }

        return genre

    } catch (error) {
        console.error('Error creating or updating genre: ', error)
        return null
    }
}