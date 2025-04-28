import styles from "@/styles/modules/search/search.module.css"
import {PlusIcon} from "@heroicons/react/24/solid";
import clsx from "clsx";

interface searchResultProps {
    name: string
    year: number
    igdbId: number
}

export default function SearchResult({name, year, igdbId}: searchResultProps) {

    const handleClick = () => {

    }

    return(
        <div className={styles.search_result} onClick={handleClick}>
            <span>
                {name} {year ? `(${year})` : ""}
            </span>
            <PlusIcon className={clsx(styles.search_result_icon, "app_icon_sm")}></PlusIcon>
        </div>
    )
}