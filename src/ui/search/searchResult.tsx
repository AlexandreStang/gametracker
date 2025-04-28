'use client'

import styles from "@/styles/modules/search/search.module.css"
import {PlusIcon} from "@heroicons/react/24/solid";
import clsx from "clsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/state/store";
import {openGameModal} from "@/state/modalGame/modalGameSlice";

interface searchResultProps {
    name: string
    year: number
    igdbId: number
}

export default function SearchResult({name, year, igdbId}: searchResultProps) {
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = () => {
        dispatch(openGameModal({mode: 'add', igdbId: igdbId, userId: 'cm7xuh4di0000vmxwj7x7am9r'}));
    }

    return (
        <div className={styles.search_result} onClick={handleClick}>
            <span>
                {name} {year ? `(${year})` : ""}
            </span>
            <PlusIcon className={clsx(styles.search_result_icon, "app_icon_sm")}></PlusIcon>
        </div>
    )
}