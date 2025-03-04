'use server'

import {getToken} from "@/api/token";

// Search for games that fit a certain query
export default async function searchGames(query: string) {
    const token = await getToken()

    const response = await
        fetch(`https://api.igdb.com/v4/games`, {
            method: 'POST',
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID as string,
                'Authorization': `Bearer ${token}`,
            },
            body: `search "${query}"; fields name, first_release_date, category; where category = (0, 8, 9) & version_parent = null; limit 10;`,
        })

    if (!response.ok) {
        throw new Error('Failed to search games');
    }

    return await response.json();
}