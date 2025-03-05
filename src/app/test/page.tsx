'use client'

import searchGames from "@/api/actions";
import Search from "@/ui/search";
import {useEffect, useState} from "react";
import {convertDate} from "@/lib/utils";

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
                const results = await searchGames(query);
                setGames(results)
            } catch (error) {
                console.error(error);
            }
        };

        fetchGames();
    }, [query]);

    const handleClick = (id: string) => {
        console.log(id)
    }

  return (
    <div>

        <Search placeholder={"Search game"} onSearch={setQuery}></Search>

        <ul>
            {games?.map((game) => (
                <li key={game.id}>
                    <span>{game.name} ({convertDate(game.first_release_date).year})</span>
                    <button className={"bg-blue-500"} onClick={(e) => handleClick(game.id)}>Add me</button>
                </li>
            ))}
        </ul>

    </div>
  );
}

