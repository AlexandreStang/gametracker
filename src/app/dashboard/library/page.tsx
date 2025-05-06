'use client'

import LibraryTable from "@/ui/library/libraryTable";
import styles from "@/styles/modules/library/library.module.css"
import {useState} from "react";
import SelectSortPlayedGames, {sortOptions} from "@/ui/selectSortPlayedGames";
import {SortPlayedGames} from "@/db/types";

const defaultValue = "6"

export default function Library() {
    const [sortBy, setSortBy] = useState<SortPlayedGames>(sortOptions[Number(defaultValue)].sortBy)

    return (
        <>
            <div className={styles.library_options}>
                <span>Sort by: </span>
                <SelectSortPlayedGames defaultValue={defaultValue}
                                       onChange={(newSortBy) => setSortBy(newSortBy)}>
                </SelectSortPlayedGames>
            </div>
            <LibraryTable sortBy={sortBy}></LibraryTable>
        </>
    );
}
