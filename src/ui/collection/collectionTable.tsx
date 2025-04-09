import styles from "@/styles/collectionTable.module.css";
import CollectionGame from "@/ui/collection/collectionGame";
import {useEffect, useState} from "react";
import {getAllFromUser} from "@/db/services/playedGameService";
import {PlayedGame} from "@prisma/client";

export default function CollectionTable() {

    const [playedGames, setplayedGames] = useState<PlayedGame[] | null>([])

    useEffect(() => {

        const fetchPlayedGames = async () => {
            try {
                const results = await getAllFromUser("cm7xuh4di0000vmxwj7x7am9r");
                setplayedGames(results)
            } catch (error) {
                console.error(error);
            }
        };

        fetchPlayedGames();
    }, []);

    console.log(playedGames)

    return (
        <table className={styles.collection_table}>
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
                <CollectionGame rank={index+1} playedGame={playedGame} key={playedGame.id}></CollectionGame>
            ))}
            </tbody>
        </table>
    )
}