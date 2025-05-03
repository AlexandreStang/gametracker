'use client'

import {formatHours} from "@/lib/utils";
import LibraryTable from "@/ui/library/libraryTable";
import SearchGames from "@/ui/search/searchGames";
import {getLastUpdateFromUser, getTotalPlaytimeFromUser} from "@/db/services/playedGameService";
import {useEffect, useState} from "react";
import ModalManager from "@/ui/modal/modalManager";
import {formatDistanceToNow} from 'date-fns/formatDistanceToNow'

export default function Collection() {

    const [totalPlaytime, setTotalPlaytime] = useState<number | null>(null)
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

    useEffect(() => {
        const fetchLastUpdate = async () => {
            try {
                const results = await getLastUpdateFromUser("cm7xuh4di0000vmxwj7x7am9r");
                console.log(results)
                setLastUpdate(results)
            } catch (error) {
                console.error(error);
            }
        };

        const fetchTotalPlaytime = async () => {
            try {
                const results = await getTotalPlaytimeFromUser("cm7xuh4di0000vmxwj7x7am9r");
                setTotalPlaytime(results)
            } catch (error) {
                console.error(error);
            }
        };

        fetchLastUpdate();
        fetchTotalPlaytime();
    }, []);

    return (
        <>
            <ModalManager></ModalManager>
            <div className="flex flex-col items-center gap-8">
                <div className="app_wrapper_md">
                    <SearchGames></SearchGames>
                </div>
                <div className="flex justify-center items-center gap-8">
                    <div>
                        Last updated:
                        <span className={"app_body_bold"}>
                            {" "}
                            {lastUpdate && formatDistanceToNow(lastUpdate, {addSuffix: true})}
                        </span>
                    </div>
                    <div>
                        Total playtime:
                        <span className={"app_body_bold"}>
                            {" "}
                            {totalPlaytime && formatHours(totalPlaytime)}
                        </span>
                    </div>
                </div>
                <LibraryTable></LibraryTable>
            </div>
        </>
    );
}
