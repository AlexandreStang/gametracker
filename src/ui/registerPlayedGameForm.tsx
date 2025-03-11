'use client'

import {useEffect, useState} from "react";
import {fetchGameFromIGDB} from "@/api/actions";
import {convertDate} from "@/lib/utils";
import {GameIGDB} from "@/api/types";
import {registerPlayedGame} from "@/services/playedGameService";

interface RegisterPlayedGameProps {
    id: number
    onComplete: () => void
}

export default function RegisterPlayedGameForm({id, onComplete}: RegisterPlayedGameProps) {

    const [game, setGame] = useState<GameIGDB | null>(null)
    const [playtime, setPlaytime] = useState<number>(0)
    const [platformId, setPlatformId] = useState<number>(NaN)
    const [like, setLike] = useState<boolean>(false)

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchGame = async () => {
            try {
                const results = await fetchGameFromIGDB(id);

                if (results) {
                    setGame(results)
                    setPlatformId(results.platforms[0].id)
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchGame();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(game, playtime, platformId, like)
        console.log(typeof game?.id, typeof playtime, typeof platformId, typeof like)

        if (game) {

            const newGame = await registerPlayedGame({
                gameIGDBid: game.id,
                platformIGDBid: platformId,
                playtime: playtime,
                like: like
            })

            console.log("Return value: ", newGame)
        }

        // Reset values
        setGame(null)
        setPlaytime(0)
        setPlatformId(NaN)
        setLike(false)

        // Notify parent component
        onComplete()
    }

    return (
        <div>
            {game &&
                <>
                    <h1>{game.name}
                        {game.first_release_date && <>({convertDate(game.first_release_date).year})</>}
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <input type="number" value={playtime}
                               onChange={(e) => setPlaytime(Number(e.target.value))}/>
                        <select name="" id="" onChange={(e) => setPlatformId(Number(e.target.value))}>
                            {game.platforms?.map((platform: { id: number; name: string }) => (
                                <option key={platform.id} value={platform.id}>{platform.name}</option>
                            ))}
                        </select>
                        <input type="checkbox" defaultChecked={like}
                               onClick={(e) => setLike((e.target as HTMLInputElement).checked)}/>
                        <button type="submit">Submit</button>
                    </form>
                </>
            }
        </div>
    )
}