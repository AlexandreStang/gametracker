'use client'

import {useDebouncedCallback} from "use-debounce";

interface SearchProps {
    placeholder: string
}

export default function Search({placeholder}: SearchProps) {

    const handleSearch = useDebouncedCallback((term: string) => {
        console.log(term)
    }, 300)

    return (
        <input type="text"
            placeholder={placeholder}
            onChange={e => {
                handleSearch(e.target.value)
            }}
        />
    )
}