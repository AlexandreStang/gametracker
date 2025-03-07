'use client'

import {useEffect, useState} from "react";
import {fetchGameFromIGDB} from "@/api/actions";
import {convertDate} from "@/lib/utils";
import {Game} from "@/api/types";

interface RegisterPlayedGameProps {
    id: string
    onComplete: () => void
}

export default function RegisterPlayedGame({id, onComplete}: RegisterPlayedGameProps) {

    const [game, setGame] = useState<Game | null>(null)

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchGame = async () => {
            try {
                const results = await fetchGameFromIGDB(id);
                setGame(results[0])
                console.log(results[0])
            } catch (error) {
                console.error(error);
            }
        };

        fetchGame();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setGame(null)
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
                        <input className="border border-black" type="number"/>
                        <select className="border border-black" name="" id="">
                            {game.platforms?.map((genre: { id: string; name: string }) => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))}
                        </select>
                        <input type="checkbox"/>
                        <button type="submit">Submit</button>
                    </form>
                </>
            }
        </div>
    )
}