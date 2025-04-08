'use client'

import {useState} from "react";
import styles from "@/styles/dashboard.module.css"
import clsx from "clsx";
import {formatHours} from "@/lib/utils";
import CollectionTable from "@/ui/collection/collectionTable";
import SearchGames from "@/ui/search/searchGames";
import User from "@/ui/user";

export default function Collection() {

    const [selectedGameId, setSelectedGameId] = useState(NaN)

    return (
        <>
            <header className={styles.dashboard_header}>
                <h1 className={styles.dashboard_heading}>Collection</h1>
                <User></User>
            </header>
            <div className="flex flex-col items-center gap-8">
                <div className={styles.dashboard_wrapper_md}>
                    <SearchGames></SearchGames>
                </div>
                <div className={clsx("flex justify-center items-center gap-8", styles.dashboard_wrapper_md)}>
                    <div className="flex justify-center items-center gap-4">
                        <span className="w-full">Last updated on:</span>
                        <input type="date"/>
                    </div>
                    <div>
                        Total playtime: <span className={"app_body_bold"}>{formatHours(3253)}</span>
                    </div>
                </div>
                <div className={styles.dashboard_wrapper_lg}>
                    <CollectionTable></CollectionTable>
                </div>
            </div>
        </>
    );
}
