import styles from "@/styles/cover.module.css"
import {Game} from "@prisma/client";
import Image from 'next/image'

interface CoverProps {
    cover: string
    size: "small" | "big"
    alt: string
    unoptimized?: boolean
}

const sizeMap = {
    small: {width: 90, height: 120},
    big: {width: 264, height: 352}
}

export default function Cover({cover, size, alt, unoptimized = false}: CoverProps) {
    const {width, height} = sizeMap[size]

    return (
        <Image
            src={`https://images.igdb.com/igdb/image/upload/t_cover_${size}/${cover}.webp`}
            width={width}
            height={height}
            quality={100}
            unoptimized={unoptimized}
            alt={alt}
            className={styles.cover}
        >
        </Image>
    )
}