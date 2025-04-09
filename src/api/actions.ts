'use server'

import {getToken} from "@/api/token";
import {GameIGDB} from "@/api/types";

// Search for games that fit a certain query
export async function searchGamesFromIGDB(query: string): Promise<GameIGDB[] | null> {
    const token = await getToken()

    const response = await
        fetch(`https://api.igdb.com/v4/games`, {
            method: 'POST',
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID as string,
                'Authorization': `Bearer ${token}`,
            },
            body: `search "${query}"; fields name, first_release_date; where game_type = (0, 8, 9, 10) & version_parent = null; limit 10;`,
        })

    if (!response.ok) {
        throw new Error('Failed to search games');
    }

    const data = response.json()

    return data || null;
}

export async function fetchGameFromIGDB(igdbId: number): Promise<GameIGDB | null> {
    const token = await getToken()

    const response = await
        fetch(`https://api.igdb.com/v4/games`, {
            method: 'POST',
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID as string,
                'Authorization': `Bearer ${token}`,
            },
            body: `fields name, slug, cover.image_id, first_release_date, genres.name, genres.updated_at, platforms.name, platforms.updated_at, updated_at; where id = ${igdbId};`,
        })

    if (!response.ok) {
        throw new Error('Game not found on IGDB')
    }

    const data = await response.json()

    return data[0] || null
}

export async function fetchAllGenresFromIGDB() {
    const token = await getToken()

    let allGenres : any[] = []
    let offset = 0
    const limit = 50;
    let hasMore = true;

    while (hasMore) {
        const response = await
            fetch(`https://api.igdb.com/v4/genres`, {
                method: 'POST',
                headers: {
                    'Client-ID': process.env.TWITCH_CLIENT_ID as string,
                    'Authorization': `Bearer ${token}`,
                },
                body: `fields name; limit ${limit}; offset ${offset};`,
            })

        if (!response.ok) {
            throw new Error('Genres not found on IGDB')
        }

        const genres = await response.json()
        allGenres = allGenres.concat(genres)
        offset += limit
        hasMore = genres.length === limit
    }

    return allGenres
}

export async function fetchAllPlatformsFromIGDB() {
    const token = await getToken()

    let allPlatforms : any[] = []
    let offset = 0
    const limit = 50;
    let hasMore = true;

    while (hasMore) {
        const response = await
            fetch(`https://api.igdb.com/v4/platforms`, {
                method: 'POST',
                headers: {
                    'Client-ID': process.env.TWITCH_CLIENT_ID as string,
                    'Authorization': `Bearer ${token}`,
                },
                body: `fields name; limit ${limit}; offset ${offset};`,
            })

        if (!response.ok) {
            throw new Error('Platforms not found on IGDB')
        }

        const platforms = await response.json()
        allPlatforms = allPlatforms.concat(platforms)
        offset += limit
        hasMore = platforms.length === limit
    }

    return allPlatforms
}