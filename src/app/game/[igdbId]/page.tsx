'use client'

import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { openModal } from "@/state/modal/modalSlice";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {fetchGameFromIGDB} from "@/api/actions";
import {GameIGDB} from "@/api/types";
import {convertDate} from "@/lib/utils";
import Cover from "@/ui/cover";

export default function GamePage() {
    const params = useParams<{igdbId: string}>()
    const igdbId = Number(params.igdbId)

    const [game, setGame] = useState<GameIGDB>()

    const dispatch = useDispatch<AppDispatch>();

    const handleClick = () => {
        if (!isNaN(igdbId)) {
            dispatch(openModal({mode: 'add', igdbId: igdbId}));
        }
    }

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const results = await fetchGameFromIGDB(igdbId);
                console.log(results)

                if (results) {
                    setGame(results)
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchGame();
    }, []);

    return (
        <>
            {game && <Cover cover={game.cover.image_id} size={"big"} alt={`${game.name} cover`}></Cover>}
            {game?.name}
            {game && convertDate(game.first_release_date).getFullYear()}
            {game?.summary}

            <button onClick={handleClick}>Open Modal</button>
        </>
    )
}