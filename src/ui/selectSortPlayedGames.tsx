import {SortPlayedGames} from "@/db/types";
import Select from "@/ui/form/select";

interface Option {
    text: string
    sortBy: SortPlayedGames
}

export const sortOptions: Option[] = [
    {text: "Name (A to Z)", sortBy: {field: "game.name", order: "asc"}},
    {text: "Name (Z to A)", sortBy: {field: "game.name", order: "desc"}},
    {text: "Release (newest first)", sortBy: {field: "game.firstReleaseDate", order: "desc"}},
    {text: "Release (oldest first)", sortBy: {field: "game.firstReleaseDate", order: "asc"}},
    {text: "Platform (A to Z)", sortBy: {field: "platform.name", order: "asc"}},
    {text: "Platform (Z to A)", sortBy: {field: "platform.name", order: "desc"}},
    {text: "Playtime (highest first)", sortBy: {field: "playtime", order: "desc"}},
    {text: "Playtime (lowest first)", sortBy: {field: "playtime", order: "asc"}},
    {text: "Last updated (newest first)", sortBy: {field: "updatedAt", order: "desc"}},
    {text: "Last updated (oldest first)", sortBy: {field: "updatedAt", order: "asc"}},
]

interface PlayedGameSort {
    defaultValue?: string
    onChange?: (sortBy: SortPlayedGames) => void
}

export default function SelectSortPlayedGames({defaultValue = "6", onChange}: PlayedGameSort) {

    const handleChange = (value: string) => {
        if (onChange) onChange(sortOptions[Number(value)].sortBy)
    }

    return (
        <Select
            name="sort"
            id="sort"
            defaultValue={defaultValue}
            onChange={(e) => handleChange(e.target.value)}
        >
            {sortOptions?.map((option, index) => (
                <option value={index} key={index}>{option.text}</option>
            ))}
        </Select>
    )
}