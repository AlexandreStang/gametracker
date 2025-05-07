import SearchBar from "@/ui/search/searchBar";
import SearchDropdown from "@/ui/search/searchDropdown";
import {useEffect, useState} from "react";
import {searchGamesFromIGDB} from "@/api/actions";
import {GamePreviewIGDB} from "@/api/types";

export default function SearchGames() {

    const [games, setGames] = useState<GamePreviewIGDB[]>([]);
    const [query, setQuery] = useState('');

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
        <div className="relative">
            <SearchBar placeholder={"Search game..."} onSearch={setQuery}></SearchBar>
            <SearchDropdown games={games}></SearchDropdown>
        </div>
    )
}