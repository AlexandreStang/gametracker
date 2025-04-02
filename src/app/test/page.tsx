'use client'

import {fetchGameFromIGDB, searchGamesFromIGDB} from "@/api/actions";
import Search from "@/ui/search";
import {useEffect, useState} from "react";
import {convertDate} from "@/lib/utils";
import Image from "next/image";
import RegisterPlayedGameForm from "@/ui/registerPlayedGameForm";
import {GameIGDB} from "@/api/types";

export default function Test() {
    const [games, setGames] = useState<GameIGDB[] | null>([]);
    const [query, setQuery] = useState('');
    const [selectedGameId, setSelectedGameId] = useState(NaN)

    useEffect(() => {
        if (!query) {
            setGames([]);
            return;
        }

        const fetchGames = async () => {
            try {
                const results = await searchGamesFromIGDB(query);
                setGames(results)
            } catch (error) {
                console.error(error);
            }
        };

        fetchGames();
    }, [query]);

    const handleClick = async (id: number) => {
        setSelectedGameId(id)
    }

    return (
        <div>

            <Search placeholder={"Search games..."} onSearch={setQuery}></Search>

            <ul>
                {games?.map((game) => (
                    <li key={game.id}>
                        <span> {game.name} {game.first_release_date && <>({convertDate(game.first_release_date).year})</>}</span>
                        <button onClick={
                            (e) => handleClick(game.id)
                        }>Add me
                        </button>
                    </li>
                ))}
            </ul>

            {/*<Image src={"https://images.igdb.com/igdb/image/upload/t_thumb/co1wvr.jpg"} width="90" height="90"*/}
            {/*       alt={"Poster"}/>*/}

            <hr/>

            {!isNaN(selectedGameId) &&
                <RegisterPlayedGameForm id={selectedGameId} onComplete={() => setSelectedGameId(NaN)}/>}

            <hr/>

        </div>
    );
}

