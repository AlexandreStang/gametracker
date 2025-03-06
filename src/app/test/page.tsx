'use client'

import {fetchGameFromIGDB, searchGamesFromIGDB} from "@/api/actions";
import Search from "@/ui/search";
import {useEffect, useState} from "react";
import {convertDate} from "@/lib/utils";
import Image from "next/image";

export default function Test() {
    const [games, setGames] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (!query) {
            setGames([]);
            return;
        }

        const fetchGames = async () => {
            try {
                const results = await searchGamesFromIGDB(query);
                setGames(results)
                console.log(results)
            } catch (error) {
                console.error(error);
            }
        };

        fetchGames();
    }, [query]);

    const handleClick = async (id: string) => {
        console.log(id)
        console.log(await fetchGameFromIGDB(id))
    }

  return (
    <div>

        <Search placeholder={"Search game"} onSearch={setQuery}></Search>

        <ul>
            {games?.map((game) => (
                <li key={game.id}>
                    <span> {game.name} ({convertDate(game.first_release_date).year})</span>
                    <button className={"bg-blue-500"} onClick={(e) => handleClick(game.id)}>Add me</button>
                </li>
            ))}
        </ul>

        <Image src={"https://images.igdb.com/igdb/image/upload/t_thumb/co1wvr.jpg"} width="90" height="90" alt={"Poster"} />

    </div>
  );
}

