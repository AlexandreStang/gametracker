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
            body: `search "${query}"; fields name, first_release_date; limit 10;`,
        })

    if (!response.ok) {
        throw new Error('Failed to search games');
    }

    return await response.json();
}