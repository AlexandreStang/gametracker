import {PencilIcon} from "@heroicons/react/24/outline";
import {formatHours} from "@/lib/utils";
import ButtonLike from "@/ui/button/buttonLike";
import ButtonIcon from "@/ui/button/buttonIcon";
import styles from "@/styles/modules/library/libraryTable.module.css"
import {PlayedGameFull} from "@/db/types";
import Cover from "@/ui/cover";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/state/store";
import {openModal} from "@/state/modal/modalSlice";
import {format} from 'date-fns';
import clsx from "clsx";
import Link from "next/link";

interface CollectionGameProps {
    // rank: number
    playedGame: PlayedGameFull
}

export default function LibraryGame({playedGame}: CollectionGameProps) {
    const dispatch = useDispatch<AppDispatch>();

    const handleEditClick = () => {
        dispatch(openModal({mode: 'edit', playedGameId: playedGame.id}));
    }

    return (
        <>
            {playedGame.game && playedGame.platform &&
                <tr>
                    {/*POSTER + NAME*/}
                    <td className={styles.td_game}>
                        <Cover cover={playedGame.game.cover} size={"small"} alt={playedGame.game.name} href={`/game/${playedGame.game.igdbId}`}></Cover>
                        <Link href={`/game/${playedGame.game.igdbId}`} className={"app_link_inline"}>{playedGame.game.name}</Link>
                    </td>
                    {/*RELEASE*/}
                    <td className={clsx(styles.td_release, styles.td_secondary)}>
                        {playedGame.game.firstReleaseDate ? playedGame.game.firstReleaseDate.getFullYear() : ""}
                    </td>
                    {/*SUPPORT*/}
                    <td className={clsx(styles.td_platform, styles.td_secondary)}>
                        {playedGame.platform.name}
                    </td>
                    {/*PLAYTIME*/}
                    <td className={clsx(styles.td_playtime, styles.td_secondary)}>
                        {playedGame.playtime > 0 && formatHours(playedGame.playtime)}
                    </td>
                    {/*LAST UPDATED*/}
                    <td className={clsx(styles.td_update, styles.td_secondary)}>
                        {format(playedGame.updatedAt, 'yyyy-MM-dd')}
                    </td>
                    {/*LIKE*/}
                    <td className={styles.td_like}>
                        <div className="flex justify-center items-center">
                            <ButtonLike playedGame={playedGame}></ButtonLike>
                        </div>
                    </td>
                    {/*EDIT*/}
                    <td className={styles.td_edit}>
                        <div className="flex justify-center items-center">
                            <ButtonIcon onClick={handleEditClick}>
                                <PencilIcon></PencilIcon>
                            </ButtonIcon>
                        </div>
                    </td>
                </tr>
            }
        </>
    )
}