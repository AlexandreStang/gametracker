'use client'

import {HeartIcon} from "@heroicons/react/24/solid";
import styles from "@/styles/button.module.css";
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
        <div className={styles.button_icon_inner} onClick={toggleLike}>
            <HeartIcon className={clsx(styles.button_toggle, {
                [styles.button_toggle_active] : liked,
                [styles.button_toggle_inactive] : !liked
            })}></HeartIcon>
        </div>
    )
}