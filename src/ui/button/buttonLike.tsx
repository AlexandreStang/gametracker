'use client'

import {HeartIcon} from "@heroicons/react/24/solid";
import styles from "@/styles/modules/toggle.module.css";
import {useState} from "react";
import clsx from "clsx";

interface ButtonLikeProps {
    initialLike: boolean
    onClick?: () => void
}

export default function ButtonLike({initialLike, onClick}: ButtonLikeProps) {

    const [liked, setLiked] = useState<boolean>(initialLike)

    const toggleLike = () => {
        setLiked(prevState => !prevState)

        if (onClick) {
            onClick()
        }
    }

    return (
        <div className="app_icon_sm" onClick={toggleLike}>
            <HeartIcon className={clsx(styles.toggle, {
                [styles.toggle_active] : liked,
                [styles.toggle_inactive] : !liked
            })}></HeartIcon>
        </div>
    )
}