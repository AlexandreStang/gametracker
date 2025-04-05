'use client'

import {useEffect, useState} from "react";
import dashboard_styles from "@/styles/dashboard.module.css"
import input_styles from "@/styles/input.module.css"
import {searchGamesFromIGDB} from "@/api/actions";
import SearchBar from "@/ui/search/searchBar";
import SearchDropdown from "@/ui/search/searchDropdown";
import {GameIGDB} from "@/api/types";
import clsx from "clsx";
import {formatHours} from "@/lib/utils";
import CollectionGame from "@/ui/collection/collectionGame";

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
        <>
            <h1 className={dashboard_styles.dashboard_heading}>Collection</h1>
            <div className="flex flex-col items-center">
                <div className={clsx("relative", dashboard_styles.dashboard_wrapper_md)}>
                    <SearchBar placeholder={"SearchBar games..."} onSearch={setQuery}></SearchBar>
                    <SearchDropdown games={games}></SearchDropdown>
                </div>
                <div className={clsx("flex justify-center items-center gap-4", dashboard_styles.dashboard_wrapper_md)}>
                    <div className="flex justify-center items-center gap-2">
                        <span className="w-full">Last updated on:</span>
                        <input type="date"/>
                    </div>
                    <div>
                        Total playtime: <span className={"body_bold"}>{formatHours(3253)}</span>
                    </div>
                </div>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Game</th>
                            <th>Released</th>
                            <th>Support</th>
                            <th>Playtime</th>
                            <th>Like</th>
                            <th>Edit</th>
                        </tr>
                        </thead>
                        <tbody>
                            <CollectionGame></CollectionGame>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
