'use client'

import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useDebouncedCallback} from "use-debounce";
import clsx from "clsx";
import styles from "@/styles/modules/search/searchBar.module.css"

interface SearchProps {
    placeholder: string
    onSearch: (query: string) => void
}

export default function SearchBar({placeholder, onSearch}: SearchProps) {

    const handleSearch = useDebouncedCallback((query: string) => {
        onSearch(query) // Return query to the parent
    }, 300)

    return (
        <div className={styles.search_bar_container}>
            <input type="text"
                   placeholder={placeholder}
                   onChange={e => {
                       handleSearch(e.target.value)
                   }}
                   className={clsx("app_input", styles.search_bar_input)}
            />
            <div className={styles.search_bar_icon_container}>
                <MagnifyingGlassIcon className={clsx("app_icon_xs", styles.search_bar_icon)} />
            </div>
        </div>
    )
}