'use client'

import styles from "@/styles/input.module.css"

import {useDebouncedCallback} from "use-debounce";

interface SearchProps {
    placeholder: string
    onSearch: (query: string) => void
}

export default function Search({placeholder, onSearch}: SearchProps) {

    const handleSearch = useDebouncedCallback((query: string) => {
        onSearch(query)
    }, 300)

    return (
        <input type="text"
            placeholder={placeholder}
            onChange={e => {
                handleSearch(e.target.value)
            }}
            className={styles.input_text}
        />
    )
}