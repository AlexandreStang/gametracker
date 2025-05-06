import {GameIGDB} from "@/api/types";
import SearchResult from "@/ui/search/searchResult";
import {convertDate} from "@/lib/utils";
import styles from "@/styles/modules/search/searchDropdown.module.css"

interface searchDropdownInterface {
    games: GameIGDB[]
}

export default function SearchDropdown({games}: searchDropdownInterface) {

    return (
        <>
            {games[0] &&
                <div className={styles.search_dropdown}>
                    {games.map(game => (
                        <SearchResult name={game.name}
                                      year={convertDate(game.first_release_date).getFullYear()}
                                      igdbId={game.id}
                                      key={game.id}>
                        </SearchResult>
                    ))}
                </div>}
        </>
    )
}