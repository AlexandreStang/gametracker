'use client'

import styles from "@/styles/modules/search/searchResult.module.css"
import {PlusIcon} from "@heroicons/react/24/solid";
import clsx from "clsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/state/store";
import {openModal} from "@/state/modal/modalSlice";
import Link from "next/link";

interface searchResultProps {
    name: string
    year?: number
    igdbId: number
}

export default function SearchResult({name, year, igdbId}: searchResultProps) {

    return (
        <>
            <Link href={`/game/${igdbId}`} className={styles.search_result}>
                {name} {year ? `(${year})` : ""}
            </Link>
            {/*<PlusIcon className={clsx(styles.search_result_icon, "app_icon_sm")}></PlusIcon>*/}
        </>
    )
}