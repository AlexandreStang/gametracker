'use client'

import searchGames from "@/api/route";
import Search from "@/ui/search";
import {useEffect, useState} from "react";

export default function Home() {
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

        {/*<ul>*/}
        {/*    {games?.map((game) => (*/}
        {/*        <li key={game.id}>{game.title}, {game.platform}, {game.playtime}</li>*/}
        {/*    ))}*/}
        {/*</ul>*/}

        <Search placeholder={"Search game"} onSearch={setQuery}></Search>


    </div>
  );
}

