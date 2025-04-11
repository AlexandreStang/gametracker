import styles from "@/styles/cover.module.css"
import {Game} from "@prisma/client";
import Image from 'next/image'

interface PosterProps {
    game: Game,
    size: "small" | "big",
    unoptimized: boolean
}

export default function Cover({game, size, unoptimized = true}: PosterProps) {
    
    return (
        <Image
            src={`https://images.igdb.com/igdb/image/upload/t_cover_${size}/${game.cover}.webp`}
            width={45}
            height={64}
            quality={100}
            unoptimized={unoptimized}
            alt={`${game.name} cover`}
            className={styles.poster}
        >
        </Image>
    )
}