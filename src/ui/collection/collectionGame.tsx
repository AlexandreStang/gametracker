import {formatHours} from "@/lib/utils";
import ButtonLike from "@/ui/button/buttonLike";
import ButtonEdit from "@/ui/button/buttonEdit";
import styles from "@/styles/collectionTable.module.css"
import {PlayedGameWithGamePlatform} from "@/db/types";

interface CollectionGameProps {
    rank: number,
    playedGame: PlayedGameWithGamePlatform
}

export default function CollectionGame({rank, playedGame}: CollectionGameProps) {

    return (
        <tr>
            <td className={styles.td_rank}>#{rank}</td>
            <td className={styles.td_game}>{playedGame?.game?.name}</td>
            <td className={styles.td_release}>{playedGame?.game?.firstReleaseDate ? playedGame.game.firstReleaseDate.getFullYear() : ""}</td>
            <td className={styles.td_support}>{playedGame?.platform?.name}</td>
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