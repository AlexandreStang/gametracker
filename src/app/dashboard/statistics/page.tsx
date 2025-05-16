'use client'

import {useEffect, useState} from "react";
import {getStatisticsFromUser} from "@/db/services/playedGameService";
import {formatHours} from "@/lib/utils";
import {UserStatistics} from "@/db/types";

export default function StatisticsPage() {
    const [statistics, setStatistics] = useState<UserStatistics>()

    useEffect(() => {

        const fetchStatistics = async () => {
            try {
                const results = await getStatisticsFromUser("cm7xuh4di0000vmxwj7x7am9r");
                console.log(results)
                setStatistics(results)
            } catch (error) {
                console.error(error);
            }
        };

        fetchStatistics()
    }, []);

    return (
        <>
            <div>
                Total games:
                <span className={"app_body_bold"}>
                {" "}
                    {statistics?.games.total && `${statistics.games.total} games`}
            </span>
            </div>
            <div>
                Total playtime:
                <span className={"app_body_bold"}>
                {" "}
                    {statistics?.playtime.total && formatHours(statistics.playtime.total)}
            </span>
            </div>
        </>
    )
}