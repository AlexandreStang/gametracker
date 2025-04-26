import styles from "@/styles/modules/search/search.module.css"
import {PlusIcon} from "@heroicons/react/24/solid";
import {useGameSelection} from "@/context/gameSelectionContext";

interface searchResultProps {
    name: string
    year: number
    igdbId: number
}

export default function SearchResult({name, year, igdbId}: searchResultProps) {

    const { setSelectedGameIgdbId } = useGameSelection();

    const handleClick = () => {
        setSelectedGameIgdbId(igdbId)
    }

    return(
        <div className={styles.search_result} onClick={handleClick}>
            <span>
                {name} ({year})
            </span>
            <PlusIcon className={styles.search_result_icon}></PlusIcon>
        </div>
    )
}