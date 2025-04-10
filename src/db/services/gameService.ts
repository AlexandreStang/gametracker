'use server'

import {convertDate} from "@/lib/utils";
import {GameController} from "@/db/controllers/gameController";
import {createOrUpdatePlatform} from "@/db/services/platformService";
import {createOrUpdateGenre} from "@/db/services/genreService";
import {fetchGameFromIGDB} from "@/api/actions";
import {GenreIGDB, PlatformIGDB} from "@/api/types";
import {Game} from "@prisma/client";

export async function getGameById(id: string): Promise<Game | null> {
    try {
        return await GameController.getById(id)

    } catch (error) {
        console.error("Could not find a game with this ID: ", error)
        return null
    }
}

export async function createOrUpdateGame(igdbId: number): Promise<Game | null> {

    try {
        const fetchedGame = await fetchGameFromIGDB(igdbId)

        if (!fetchedGame) {
            console.error("There are no games with this id on IGDB")
            return null
        }

        const game = await GameController.getByIgdbId(igdbId)

        // Create a new game inside the database if it doesn't already exist
        if (!game) {

            let genres: string[] = await getGenresList(fetchedGame.genres)
            let platforms: string[] = await getPlatformsList(fetchedGame.platforms)

            return await GameController.create({
                igdbId: fetchedGame.id,
                slug: fetchedGame.slug,
                name: fetchedGame.name,
                firstReleaseDate: convertDate(fetchedGame.first_release_date).date,
                platformsId: platforms,
                genresId: genres
            })

        }

        // Update the game inside the database if the IGDB genre has been updated recently
        if (game.updatedAt.getTime() < fetchedGame.updated_at) {
            let genres: string[] = await getGenresList(fetchedGame.genres)
            let platforms: string[] = await getPlatformsList(fetchedGame.platforms)

            return await GameController.update(game.id, {
                slug: fetchedGame.slug,
                name: fetchedGame.name,
                firstReleaseDate: convertDate(fetchedGame.first_release_date).date,
                platformsId: platforms,
                genresId: genres
            })
        }

        return game

    } catch (error) {
        console.error("Error creating or updating game: ", error)
        return null
    }

}

async function getPlatformsList(platforms: PlatformIGDB[]): Promise<string[]> {
    let platformsList: string[] = []

    for (let i = 0; i < platforms.length; i++) {
        const newPlatform = await createOrUpdatePlatform(platforms[i])
        newPlatform && platformsList.push(newPlatform.id)
    }

    return platformsList
}

async function getGenresList(genres: GenreIGDB[]): Promise<string[]> {
    let genresList: string[] = []

    for (let i = 0; i < genres.length; i++) {
        const newGenre = await createOrUpdateGenre(genres[i])
        newGenre && genresList.push(newGenre.id)
    }

    return genresList
}