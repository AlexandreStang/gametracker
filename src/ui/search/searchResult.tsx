interface searchResultProps {
    name: string,
    year: number
}

export default function SearchResult({name, year}: searchResultProps) {

    return(
        <div>
            {name} ({year})
        </div>
    )
}