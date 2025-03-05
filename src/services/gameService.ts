'use server'

import {prisma} from "@/lib/prisma";

async function addGameToList(listId: string, gameId: string) {
    // console.log(listId, gameId)
    //
    // const listExists = await prisma.list.findUnique({
    //     where: {id: listId}
    // })
    //
    // if (!listExists) {
    //     throw new Error("List not found");
    // }
    //
    // const

}

