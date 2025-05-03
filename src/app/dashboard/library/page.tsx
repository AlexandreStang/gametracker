'use client'

import {formatHours} from "@/lib/utils";
import CollectionTable from "@/ui/collection/collectionTable";
import SearchGames from "@/ui/search/searchGames";
import {getTotalPlaytimeFromUser} from "@/db/services/playedGameService";
import {useEffect, useState} from "react";
import ModalManager from "@/ui/modal/modalManager";

export default function Collection() {

    const [totalPlaytime, setTotalPlaytime] = useState<number | null>(null)

    useEffect(() => {
        const fetchTotalPlaytime = async () => {
            try {
                const results = await getTotalPlaytimeFromUser("cm7xuh4di0000vmxwj7x7am9r");
                setTotalPlaytime(results)
            } catch (error) {
                console.error(error);
            }
        };

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
                    <div className="flex justify-center items-center gap-4">
                        <span className="w-full">Last updated on:</span>
                        <input type="date" className="app_input"/>
                    </div>
                    <div>
                        Total playtime:
                        <span className={"app_body_bold"}>
                            {" "}
                            {totalPlaytime && formatHours(totalPlaytime)}
                        </span>
                    </div>
                </div>
                <CollectionTable></CollectionTable>
            </div>
        </>
    );
}
