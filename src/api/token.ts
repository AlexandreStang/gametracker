import {NextApiRequest, NextApiResponse} from "next";

let cachedToken: string | null = null
let tokenExpirationTime: number | null = null

// Fetch a new access token from the IGDB API
async function fetchNewToken() {
    const response = await
        fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
            method: 'POST'
        })

    if (!response.ok) {
        throw new Error('Failed to fetch a new token');
    }

    return await response.json();
}

// Get either a cached token or a brand new one
export async function getToken() {
    const currentTime = Date.now()

    if (cachedToken && tokenExpirationTime && currentTime < tokenExpirationTime) {
        return cachedToken
    }

    try {
        const newToken = await fetchNewToken()
        cachedToken = newToken.access_token
        tokenExpirationTime = Date.now() + newToken.expires_in * 1000
        return cachedToken
    } catch (error) {
        throw new Error('Failed to get token')
    }
}