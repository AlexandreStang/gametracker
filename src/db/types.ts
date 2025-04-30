import { Prisma } from "@prisma/client";

export type PlayedGameFull = Prisma.PlayedGameGetPayload<{
    include: {
        game: true,
        platform: true
    }
}>