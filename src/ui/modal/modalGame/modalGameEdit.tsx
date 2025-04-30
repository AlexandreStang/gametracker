import Modal from "@/ui/modal/modal";
import Button from "@/ui/button/button";
import {closeGameModal} from "@/state/modalGame/modalGameSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/state/store";
import styles from "@/styles/modules/modal/modalGame.module.css";
import Cover from "@/ui/cover";
import clsx from "clsx";
import {convertDate} from "@/lib/utils";
import FormItem from "@/ui/form/formItem";
import FormLike from "@/ui/form/formLike";
import {useEffect, useState} from "react";
import {GameIGDB} from "@/api/types";
import {fetchGameFromIGDB} from "@/api/actions";
import {getGameById} from "@/db/services/gameService";
import {Game} from "@prisma/client";
import {getPlayedGameById, getFullPlayedGameById} from "@/db/services/playedGameService";
import {getPlatformById} from "@/db/services/platformService";

interface modalGameEditProps {
    playedGameId: string
}

export default function ModalGameEdit({playedGameId}: modalGameEditProps) {
    const dispatch = useDispatch<AppDispatch>();

    const [game, setGame] = useState<GameIGDB | null>(null)
    const [playtime, setPlaytime] = useState<number>(0)
    const [platformId, setPlatformId] = useState<number>(0)
    const [like, setLike] = useState<boolean>(false)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const playedGame = await getFullPlayedGameById(playedGameId)

                if (!playedGame) {
                    return null
                }

                const results = await fetchGameFromIGDB(playedGame.game.igdbId);

                if (results) {
                    setGame(results)
                    setPlaytime(playedGame.playtime)
                    setPlatformId(playedGame.platform.igdbId)
                    setLike(playedGame.like)
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [playedGameId]);

    return (
        <Modal
            header={"You played..."}
            footer={
                <>
                    <Button text={"Delete"}></Button>
                    <Button text={"Save"}></Button>
                </>
            }
            onClose={() => dispatch(closeGameModal())}
        >
            <div className={styles.modal_game_content}>

                {/*COVER*/}
                {game &&
                    <div className={styles.modal_game_cover}>
                        <Cover cover={game.cover.image_id} size={"big"} alt={game.name}></Cover>
                    </div>
                }

                {/*GAME TITLE AND FORM*/}
                <div className={styles.modal_game_text_content}>
                    {game &&
                        <h3 className={clsx(styles.modal_game_heading, "app_heading_3")}>
                            {game.name} <span
                            className={styles.modal_game_heading_date}>({convertDate(game.first_release_date).year})</span>
                        </h3>
                    }

                    <form className={styles.modal_game_form}>

                        <FormItem label={"Console"} htmlFor={"modalGameConsole"}>
                            <select
                                name="console"
                                id="modalGameConsole"
                                className="app_select"
                                onChange={(e) => setPlatformId(Number(e.target.value))}
                                value={platformId}
                            >
                                {game && game.platforms?.map((platform: { id: number; name: string }) => (
                                    <option
                                        key={platform.id}
                                        value={platform.id}
                                    >
                                        {platform.name}
                                    </option>
                                ))}
                            </select>
                        </FormItem>

                        <div className={styles.modal_game_form_row}>

                            <FormItem label={"Playtime (in hours)"} htmlFor={"modalGamePlaytime"}>
                                <input
                                    type="number"
                                    min="0"
                                    id="modalGamePlaytime"
                                    className="app_input"
                                    value={playtime}
                                    onChange={(e) => setPlaytime(Number(e.target.value))}
                                />
                            </FormItem>

                            <FormItem label={"Like"} htmlFor={"modalGameLike"} isCentered={true}>
                                <FormLike
                                    id={"modalGameLike"}
                                    initialLike={like}
                                    onChange={(newLike) => setLike(newLike)}>
                                </FormLike>
                            </FormItem>

                        </div>

                    </form>
                </div>
            </div>
        </Modal>
    )
}