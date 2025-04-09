import {formatHours} from "@/lib/utils";
import ButtonLike from "@/ui/button/buttonLike";
import ButtonEdit from "@/ui/button/buttonEdit";
import styles from "@/styles/collectionTable.module.css"
import {Game, Platform, PlayedGame} from "@prisma/client";
import {useEffect, useState} from "react";
import {getGameById} from "@/db/services/gameService";
import {getPlatformById} from "@/db/services/platformService";

interface CollectionGameProps {
    rank: number,
    playedGame: PlayedGame
}

export default function CollectionGame({rank, playedGame}: CollectionGameProps) {

    const [game, setGame] = useState<Game | null>(null)
    const [platform, setPlatform] = useState<Platform | null>(null)

    useEffect(() => {
        if (!playedGame) {
            setGame(null)
            setPlatform(null)
            return
        }

        const fetchGame = async () => {
            try {
                const results = await getGameById(playedGame.gameId)
                setGame(results)
            } catch (error) {
                console.error(error);
            }
        };

        const fetchPlatform = async () => {
            try {
                const results = await getPlatformById(playedGame.platformId)
                setPlatform(results)
            } catch (error) {
                console.error(error);
            }
        };

        fetchGame();
        fetchPlatform();
    }, [playedGame]);

    return (
        <tr>
            <td className={styles.td_rank}>#{rank}</td>
            <td className={styles.td_game}>{game?.name}</td>
            <td className={styles.td_release}>{game?.firstReleaseDate ? game.firstReleaseDate.getFullYear() : ""}</td>
            <td className={styles.td_support}>{platform?.name}</td>
            <td className={styles.td_playtime}>{formatHours(playedGame?.playtime)}</td>
            <td className={styles.td_like}>
                <div className="flex justify-center items-center">
                    <ButtonLike initialLike={playedGame?.like}></ButtonLike>
                </div>
            </td>
            <td className={styles.td_edit}>
                <div className="flex justify-center items-center">
                    <ButtonEdit></ButtonEdit>
                </div>
            </td>
        </tr>
    )
}