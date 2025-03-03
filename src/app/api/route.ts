import {getToken} from "@/app/api/token";
// import {NextApiRequest, NextApiResponse} from "next";

export default async function test() {
    try {
        const token = getToken()
        return token
    } catch (error) {
        throw new Error('Test failed')
    }
}