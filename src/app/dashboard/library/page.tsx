'use client'

import LibraryTable from "@/ui/library/libraryTable";
import styles from "@/styles/modules/library/library.module.css"
import {useState} from "react";

export default function Library() {
    const [sort, setSort] = useState<string | null>(null)

    return (
        <>
            <div className={styles.library_options}>
                <span>Sort by: </span>
                <div className={styles.library_select}>
                    <select name="sort" id="sort" className={"app_select"}>
                        <option value="">Name (A to Z)</option>
                        <option value="">Name (Z to A)</option>
                        <option value="">Release (newest first)</option>
                        <option value="">Release (oldest first)</option>
                        <option value="">Support (A to Z)</option>
                        <option value="">Support (Z to A)</option>
                        <option value="">Playtime (highest first)</option>
                        <option value="">Playtime (lowest first)</option>
                        <option value="">Last updated (newest first)</option>
                        <option value="">Last updated (oldest first)</option>
                    </select>
                </div>
            </div>
            <LibraryTable></LibraryTable>
        </>
    );
}
