import Modal from "@/ui/modal/modal";
import Button from "@/ui/button/button";
import Cover from "@/ui/cover";
import styles from "@/styles/modules/modal/modalGame.module.css"
import {useEffect, useState} from "react";
import {fetchGameFromIGDB} from "@/api/actions";
import {GameIGDB} from "@/api/types";
import {convertDate} from "@/lib/utils";
import FormItem from "@/ui/form/formItem";
import clsx from "clsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/state/store";
import {closeGameModal} from "@/state/modalGame/modalGameSlice";

interface modalGameAddProps {
    igdbId: number
    userId: string
}

export default function ModalGameAdd({igdbId, userId}: modalGameAddProps) {
    const dispatch = useDispatch<AppDispatch>();

    const [game, setGame] = useState<GameIGDB | null>(null)
    const [playtime, setPlaytime] = useState<number>(0)
    const [platformId, setPlatformId] = useState<number>(NaN)
    const [like, setLike] = useState<boolean>(false)

    useEffect(() => {

        if (!igdbId) {
            return
        }

        const fetchGame = async () => {
            try {
                const results = await fetchGameFromIGDB(igdbId);

                if (results) {
                    console.log(results)
                    setGame(results)
                    setPlatformId(results.platforms[0].id)
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchGame();
    }, [igdbId]);

    return (
        <Modal
            header={"You played..."}
            footer={<Button text={"Save"}></Button>}
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
                        <h3 className={clsx(styles.modal_game_heading, "app_heading_3")}>{game.name} <span
                            className={styles.modal_game_heading_date}>({convertDate(game.first_release_date).year})</span>
                        </h3>
                    }

                    <form className={styles.modal_game_form}>

                        <FormItem label={"Console"} htmlFor={"modalGameConsole"}>
                            <select name="console" id="modalGameConsole" className="app_select">
                                {game && game.platforms?.map((platform: { id: number; name: string }) => (
                                    <option key={platform.id} value={platform.id}>{platform.name}</option>
                                ))}
                            </select>
                        </FormItem>

                        <div className={styles.modal_game_form_row}>

                            <FormItem label={"Playtime (in hours)"} htmlFor={"modalGamePlaytime"}>
                                <input type="number" defaultValue="0" min="0" id="modalGamePlaytime"
                                       className="app_input"/>
                            </FormItem>

                            <FormItem label={"Like"} htmlFor={"modalGameLike"} isCentered={true}>
                                <input type="checkbox" id="modalGameLike"/>
                            </FormItem>

                        </div>

                    </form>
                </div>
            </div>
        </Modal>
    )
}