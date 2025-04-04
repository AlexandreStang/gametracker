import {GameIGDB} from "@/api/types";
import SearchResult from "@/ui/search/searchResult";
import {convertDate} from "@/lib/utils";

interface searchDropdownInterface {
    games: GameIGDB[]
}

export default function SearchDropdown({games}: searchDropdownInterface) {

    return(
        <div>
            {games.map(game => (
                <SearchResult name={game.name} year={convertDate(game.first_release_date).year} key={game.id}></SearchResult>
            ))}
        </div>
    )
}