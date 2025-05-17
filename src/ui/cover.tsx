import styles from "@/styles/modules/cover.module.css"
import Image from 'next/image'
import Link from "next/link";

interface CoverProps {
    cover: string
    size: "small" | "big"
    alt: string
    unoptimized?: boolean
    href?: string
    openTab?: boolean
}

const sizeMap = {
    small: {width: 90, height: 120},
    big: {width: 264, height: 352}
}

export default function Cover({cover, size, alt, unoptimized = false, href, openTab = false}: CoverProps) {
    const {width, height} = sizeMap[size]

    const renderCover = () => {
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

    // Return cover with page link
    if (href) {
        return (
            <Link href={href} className={"h-full shrink-0"} {...(openTab ? {target: "_blank", rel: "noopener noreferrer" } : {})}>
                {renderCover()}
            </Link>
        )
    }

    // Return cover alone
    return (
        <>
            {renderCover()}
        </>
    )
}