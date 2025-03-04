'use client'

import searchGames from "@/api/actions";
import Search from "@/ui/search";
import {useEffect, useState} from "react";
import {convertDate} from "@/lib/utils";

export default function Test() {
    // const games = await prisma.game.findMany()
    //
    // // await fetchData()

    const [games, setGames] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (!query) {
            setGames([]);
            return;
        }

        const fetchGames = async () => {
            try {
                const results = await searchGames(query);
                setGames(results)
                console.log(results)
            } catch (error) {
                console.error(error);
            }
        };

        fetchGames();
    }, [query]);

  return (
    <div>

        <Search placeholder={"Search game"} onSearch={setQuery}></Search>

        <ul>
            {games?.map((game) => (
                <li key={game.id}>{game.name} ({convertDate(game.first_release_date).year})</li>
            ))}
        </ul>

    </div>
  );
}

