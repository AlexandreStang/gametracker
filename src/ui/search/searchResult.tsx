import styles from "@/styles/search.module.css"
import {PlusIcon} from "@heroicons/react/24/solid";

interface searchResultProps {
    name: string,
    year: number
}

export default function SearchResult({name, year}: searchResultProps) {

    return(
        <div className={styles.search_result}>
            <span>
                {name} ({year})
            </span>
            <PlusIcon className={styles.search_result_icon}></PlusIcon>
        </div>
    )
}