import styles from "@/styles/cover.module.css"
import {Game} from "@prisma/client";
import Image from 'next/image'

interface PosterProps {
    game: Game
    size: "small" | "big"
    unoptimized?: boolean
}

const sizeMap = {
    small: {width: 90, height: 120},
    big: {width: 264, height: 352}
}

export default function Cover({game, size, unoptimized = false}: PosterProps) {
    const {width, height} = sizeMap[size]

    return (
        <Image
            src={`https://images.igdb.com/igdb/image/upload/t_cover_${size}/${game.cover}.webp`}
            width={width}
            height={height}
            quality={100}
            unoptimized={unoptimized}
            alt={`${game.name} cover`}
            className={styles.cover}
        >
        </Image>
    )
}