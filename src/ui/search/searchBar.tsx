'use client'

import styles from "@/styles/input.module.css"
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";

import {useDebouncedCallback} from "use-debounce";
import clsx from "clsx";

interface SearchProps {
    placeholder: string
    onSearch: (query: string) => void
}

export default function SearchBar({placeholder, onSearch}: SearchProps) {

    const handleSearch = useDebouncedCallback((query: string) => {
        onSearch(query) // Return query to the parent
    }, 300)

    return (
        <div className="relative">
            <input type="text"
                   placeholder={placeholder}
                   onChange={e => {
                       handleSearch(e.target.value)
                   }}
                   className={clsx(styles.input_text, styles.input_text_w_icon)}
            />
            <div className="absolute top-0 h-full flex items-center">
                <MagnifyingGlassIcon className={styles.input_icon} />
            </div>
        </div>
    )
}