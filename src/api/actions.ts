'use server'

import {getToken} from "@/api/token";

// Search for games that fit a certain query
export async function searchGamesFromIGDB(query: string) {
    const token = await getToken()

    const response = await
        fetch(`https://api.igdb.com/v4/games`, {
            method: 'POST',
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID as string,
                'Authorization': `Bearer ${token}`,
            },
            body: `search "${query}"; fields name, first_release_date; where category = (0, 8, 9) & version_parent = null; limit 10;`,
        })

    if (!response.ok) {
        throw new Error('Failed to search games');
    }

    return response.json();
}

export async function fetchGameFromIGDB(igdbId: string) {
    const token = await getToken()

    const response = await
        fetch(`https://api.igdb.com/v4/games`, {
            method: 'POST',
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID as string,
                'Authorization': `Bearer ${token}`,
            },
            body: `fields name, cover.image_id, first_release_date, genres.name, platforms.name; where id = ${igdbId};`,
        })

    if (!response.ok) {
        throw new Error('Game not found on IGDB')
    }

    return response.json()
}