import {getToken} from "@/api/token";
// import {NextApiRequest, NextApiResponse} from "next";

export default async function test() {
    const token = await getToken()

    const response = await
        fetch(`https://api.igdb.com/v4/games`, {
            method: 'POST',
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID as string,
                'Authorization': `Bearer ${token}`,
            },
            body: "fields name, release_dates, genres; limit 10;",
        })

    if (!response.ok) {
        throw new Error('Failed to fetch games');
    }

    return await response.json();
}