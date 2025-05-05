'use client'

import {useEffect, useState} from "react";
import {getTotalPlaytimeFromUser} from "@/db/services/playedGameService";
import {formatHours} from "@/lib/utils";

export default function Statistics() {
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
        <div>
            Total playtime:
            <span className={"app_body_bold"}>
                            {" "}
                {totalPlaytime && formatHours(totalPlaytime)}
                        </span>
        </div>
    )
}