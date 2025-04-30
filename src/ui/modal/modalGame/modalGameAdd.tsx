import Modal from "@/ui/modal/modal";
import Button from "@/ui/button/button";
import Cover from "@/ui/cover";
import styles from "@/styles/modules/modal/modalGame.module.css"
import {useState} from "react";
import {GameIGDB} from "@/api/types";
import {convertDate} from "@/lib/utils";
import FormItem from "@/ui/form/formItem";
import clsx from "clsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/state/store";
import {closeModal} from "@/state/modal/modalSlice";
import {registerPlayedGame} from "@/db/services/playedGameService";
import FormLike from "@/ui/form/formLike";
import {modalGameForm} from "@/ui/modal/modalManager";

interface modalGameAddProps {
    data: modalGameForm
}

export default function ModalGameAdd({data}: modalGameAddProps) {
    const dispatch = useDispatch<AppDispatch>();

    const [platformId, setPlatformId] = useState<number>(data.platformId)
    const [playtime, setPlaytime] = useState<number>(data.playtime)
    const [like, setLike] = useState<boolean>(data.like)

    const handleSave = async () => {

        // console.log(data.game, playtime, platformId, like)

        if (data.game) {
            const newGame = await registerPlayedGame({
                gameIgdbId: data.game.id,
                platformIgdbId: platformId,
                playtime: playtime,
                like: like,
                userId: 'cm7xuh4di0000vmxwj7x7am9r'
            })
        }

        dispatch(closeModal())
    }

    return (
        <Modal
            header={"You played..."}
            footer={<Button text={"Save"} onClick={handleSave}></Button>}
            onClose={() => dispatch(closeModal())}
        >
            <div className={styles.modal_game_content}>

                {/*COVER*/}
                {data.game &&
                    <div className={styles.modal_game_cover}>
                        <Cover cover={data.game.cover.image_id} size={"big"} alt={data.game.name}></Cover>
                    </div>
                }

                {/*GAME TITLE AND FORM*/}
                <div className={styles.modal_game_text_content}>
                    {data.game &&
                        <h3 className={clsx(styles.modal_game_heading, "app_heading_3")}>
                            {data.game.name} <span
                            className={styles.modal_game_heading_date}>({convertDate(data.game.first_release_date).year})</span>
                        </h3>
                    }

                    <form className={styles.modal_game_form}>

                        <FormItem label={"Console"} htmlFor={"modalGameConsole"}>
                            <select
                                name="console"
                                id="modalGameConsole"
                                className="app_select"
                                onChange={(e) => setPlatformId(Number(e.target.value))}>
                                {data.game && data.game.platforms?.map((platform: { id: number; name: string }) => (
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
                                    defaultValue="0"
                                    min="0"
                                    id="modalGamePlaytime"
                                    className="app_input"
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