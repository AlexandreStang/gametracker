import { Prisma } from "@prisma/client";

export type PlayedGameWithGamePlatform = Prisma.PlayedGameGetPayload<{
    include: {
        game: true,
        platform: true
    }
}>