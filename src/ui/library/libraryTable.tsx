import styles from "@/styles/modules/library/libraryTable.module.css";
import LibraryGame from "@/ui/library/libraryGame";
import {useEffect, useState} from "react";
import {getAllFullPlayedGamesFromUser} from "@/db/services/playedGameService";
import {PlayedGameFull, SortPlayedGames} from "@/db/types";
import Table from "@/ui/table";

interface LibraryTableProps {
    sortBy?: SortPlayedGames
}

export default function LibraryTable({sortBy}: LibraryTableProps) {

    const [playedGames, setPlayedGames] = useState<PlayedGameFull[] | null>(null)

    useEffect(() => {
        const fetchPlayedGames = async () => {
            try {
                const results = await getAllFullPlayedGamesFromUser("cm7xuh4di0000vmxwj7x7am9r", sortBy);
                setPlayedGames(results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPlayedGames();
    }, [sortBy]);

    if (!playedGames) {
        return
    }

    return (
        <Table>
            <thead>
            <tr>
                <th className={styles.th_game}>Game</th>
                <th className={styles.th_release}>Released</th>
                <th className={styles.th_platform}>Platform</th>
                <th className={styles.th_playtime}>Playtime</th>
                <th className={styles.th_update}>Last Updated</th>
                <th className={styles.th_like}>Like</th>
                <th className={styles.th_edit}>Edit</th>
            </tr>
            </thead>
            <tbody>
            {playedGames?.map((playedGame, index) => (
                <LibraryGame playedGame={playedGame} key={playedGame.id}></LibraryGame>
            ))}
            </tbody>
        </Table>
    )
}