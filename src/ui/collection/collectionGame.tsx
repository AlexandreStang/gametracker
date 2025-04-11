import {formatHours} from "@/lib/utils";
import ButtonLike from "@/ui/button/buttonLike";
import ButtonEdit from "@/ui/button/buttonEdit";
import styles from "@/styles/collectionTable.module.css"
import {PlayedGameWithGamePlatform} from "@/db/types";
import Cover from "@/ui/cover";

interface CollectionGameProps {
    rank: number,
    playedGame: PlayedGameWithGamePlatform
}

export default function CollectionGame({rank, playedGame}: CollectionGameProps) {

    return (
        <>
            {playedGame.game && playedGame.platform &&
                <tr>
                    {/*RANK*/}
                    <td className={styles.td_rank}>
                        #{rank}
                    </td>
                    {/*POSTER + NAME*/}
                    <td className={styles.td_game}>
                        <Cover game={playedGame.game} size={"small"} unoptimized={true}></Cover>
                        {playedGame.game.name}
                    </td>
                    {/*RELEASE*/}
                    <td className={styles.td_release}>
                        {playedGame.game.firstReleaseDate ? playedGame.game.firstReleaseDate.getFullYear() : ""}
                    </td>
                    {/*SUPPORT*/}
                    <td className={styles.td_support}>
                        {playedGame.platform.name}
                    </td>
                    {/*PLAYTIME*/}
                    <td className={styles.td_playtime}>
                        {formatHours(playedGame.playtime)}
                    </td>
                    {/*LIKE*/}
                    <td className={styles.td_like}>
                        <div className="flex justify-center items-center">
                            <ButtonLike initialLike={playedGame.like}></ButtonLike>
                        </div>
                    </td>
                    {/*EDIT*/}
                    <td className={styles.td_edit}>
                        <div className="flex justify-center items-center">
                            <ButtonEdit></ButtonEdit>
                        </div>
                    </td>
                </tr>
            }
        </>
    )
}