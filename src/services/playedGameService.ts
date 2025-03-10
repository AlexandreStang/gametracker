'use server'

import {GameController} from "@/controllers/gameController";
import {PlayedGameController} from "@/controllers/playedGameController";
import {fetchGameFromIGDB} from "@/api/actions";
import {createOrUpdateGenre} from "@/services/genreService";
import {createOrUpdatePlatform} from "@/services/platformService";
import {convertDate} from "@/lib/utils";

export interface PlayedGameFormData {
    gameIdIGDB: number,
    platformIdIGDB: number,
    playtime: number,
    like: boolean
}

export async function registerPlayedGame(data: PlayedGameFormData) {

    // Verify if the game is already in the database
    const game = await GameController.getByIgdbId(data.gameIdIGDB)

    console.log("Game in database: ", game)

    // If not, add it to the database
    if (!game) {
        const fetchedGame = await fetchGameFromIGDB(data.gameIdIGDB)

        // Cancel process if there are no games with this id on IGDB
        if (!fetchedGame) {
            throw Error("There are no games with this id on IGDB")
        }

        console.log("Fetched game in API:", fetchedGame)

        let genres: string[] = []
        let platforms: string[] = []

        for (let i = 0; i < fetchedGame.genres.length; i++) {
            const genre = await createOrUpdateGenre(fetchedGame.genres[i])
            genres.push(genre.id)
        }

        for (let i = 0; i < fetchedGame.platforms.length; i++) {
            const platform = await createOrUpdatePlatform(fetchedGame.platforms[i])
            platforms.push(platform.id)
        }

        console.log("Genres: ", genres)
        console.log("Platforms:", platforms)

        // return await GameController.create({
        //     igdbId: fetchedGame.id,
        //     slug: fetchedGame.slug,
        //     name: fetchedGame.name,
        //     firstReleaseDate: convertDate(fetchedGame.first_release_date).date,
        //     platformsId: platforms,
        //     genresId: genres
        // })
    }

    return game
}
