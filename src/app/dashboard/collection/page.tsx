'use client'

import {useEffect, useState} from "react";
import styles from "@/styles/dashboard.module.css"
import {searchGamesFromIGDB} from "@/api/actions";
import Search from "@/ui/search/search";
import SearchDropdown from "@/ui/search/searchDropdown";
import {GameIGDB} from "@/api/types";

export default function Collection() {
    const [games, setGames] = useState<GameIGDB[]>([]);
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

                if (results) {
                    setGames(results)
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchGames();
    }, [query]);

    return (
        <div>
            <h1 className={styles.dashboard_heading}>Collection</h1>
            <div className="relative">
                <Search placeholder={"Search games..."} onSearch={setQuery}></Search>
                <SearchDropdown games={games}></SearchDropdown>
            </div>
            <div>

            </div>
            <div></div>
        </div>
    );
}
