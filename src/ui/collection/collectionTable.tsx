import styles from "@/styles/collectionTable.module.css";
import CollectionGame from "@/ui/collection/collectionGame";
import {useEffect, useState} from "react";
import {getAllPlayedGamesFromUser} from "@/db/services/playedGameService";
import {PlayedGameWithGamePlatform} from "@/db/types";
import Table from "@/ui/table";

export default function CollectionTable() {

    const [playedGames, setPlayedGames] = useState<PlayedGameWithGamePlatform[] | null>([])

    useEffect(() => {
        const fetchPlayedGames = async () => {
            try {
                const results = await getAllPlayedGamesFromUser("cm7xuh4di0000vmxwj7x7am9r");
                setPlayedGames(results)
            } catch (error) {
                console.error(error);
            }
        };

        fetchPlayedGames();
    }, []);

    return (
        <Table>
            <thead>
            <tr>
                <th className={styles.th_rank}>Rank</th>
                <th className={styles.th_game}>Game</th>
                <th className={styles.th_release}>Released</th>
                <th className={styles.th_support}>Support</th>
                <th className={styles.th_playtime}>Playtime</th>
                <th className={styles.th_like}>Like</th>
                <th className={styles.th_edit}>Edit</th>
            </tr>
            </thead>
            <tbody>
            {playedGames?.map((playedGame, index) => (
                <CollectionGame rank={index + 1} playedGame={playedGame} key={playedGame.id}></CollectionGame>
            ))}
            </tbody>
        </Table>
    )
}