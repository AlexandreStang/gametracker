'use server'

import {convertDate} from "@/lib/utils";
import {GameController} from "@/controllers/gameController";
import {createOrUpdatePlatform} from "@/services/platformService";
import {createOrUpdateGenre} from "@/services/genreService";
import {fetchGameFromIGDB} from "@/api/actions";
import {GenreIGDB, PlatformIGDB} from "@/api/types";

export async function createOrUpdateGame(IGDBid: number) {

    const fetchedGame = await fetchGameFromIGDB(IGDBid)

    if (!fetchedGame) {
        throw Error("There are no games with this id on IGDB")
    }

    const game = await GameController.getByIgdbId(IGDBid)

    console.log("Game in database: ", game)

    // Create a new game inside the database if it doesn't already exist
    if (!game) {

        console.log("Fetched game in API:", fetchedGame)

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

}

async function getPlatformsList(platforms: PlatformIGDB[]) {
    let platformsList: string[] = []

    for (let i = 0; i < platforms.length; i++) {
        const newPlatform = await createOrUpdatePlatform(platforms[i])
        platformsList.push(newPlatform.id)
    }

    return platformsList
}

async function getGenresList(genres: GenreIGDB[]) {
    let genresList: string[] = []

    for (let i = 0; i < genres.length; i++) {
        const newGenre = await createOrUpdateGenre(genres[i])
        genresList.push(newGenre.id)
    }

    return genresList
}