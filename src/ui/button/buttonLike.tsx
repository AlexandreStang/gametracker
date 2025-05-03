'use client'

import {HeartIcon} from "@heroicons/react/24/solid";
import styles from "@/styles/modules/toggle.module.css";
import {useState} from "react";
import clsx from "clsx";
import {updateLikePlayedGame} from "@/db/services/playedGameService";
import {PlayedGame} from "@prisma/client";

interface ButtonLikeProps {
    playedGame: PlayedGame
}

export default function ButtonLike({playedGame}: ButtonLikeProps) {

    const [liked, setLiked] = useState<boolean>(playedGame.like)

    const toggleLike = async () => {

        const newLiked = !liked
        setLiked(newLiked)
        const game = await updateLikePlayedGame(playedGame.id, newLiked)

        // setLiked(prevState => !prevState)

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