import Modal from "@/ui/modal/modal";
import Button from "@/ui/button/button";
import {closeModal} from "@/state/modal/modalSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/state/store";
import styles from "@/styles/modules/modal/modalGame.module.css";
import Cover from "@/ui/cover";
import clsx from "clsx";
import {convertDate} from "@/lib/utils";
import FormItem from "@/ui/form/formItem";
import FormLike from "@/ui/form/formLike";
import {useState} from "react";
import {modalGameForm} from "@/ui/modal/modalManager";
import {deletePlayedGame, updatePlayedGame} from "@/db/services/playedGameService";
import Select from "@/ui/select/select";

interface modalGameEditProps {
    formData: modalGameForm
    playedGameId: string
}

export default function ModalGameEdit({formData, playedGameId}: modalGameEditProps) {
    const dispatch = useDispatch<AppDispatch>();

    const [playtime, setPlaytime] = useState<number>(formData.playtime)
    const [platformId, setPlatformId] = useState<number>(formData.platformId)
    const [like, setLike] = useState<boolean>(formData.like)
    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    const handleSave = async () => {

        if (!isProcessing) {
            setIsProcessing(true)

            const playedGame = await updatePlayedGame({
                playedGameId: playedGameId,
                platformIgdbId: platformId,
                playtime: playtime,
                like: like
            })

            dispatch(closeModal())
            setIsProcessing(false)
        }

    }

    const handleDelete = () => {

        if (!isProcessing) {
            setIsProcessing(true)

            if (confirm("Are you sure you want to delete this entry?")) {
                return confirmDelete();
            }

            setIsProcessing(false)
        }

    }

    const confirmDelete = async () => {
        const playedGame = await deletePlayedGame(playedGameId)
        dispatch(closeModal())
        setIsProcessing(false)
    }

    return (
        <Modal
            header={"You played..."}
            footer={
                <>
                    <Button text={"Delete"} isDisabled={isProcessing} type={"danger"} onClick={handleDelete}></Button>
                    <Button text={"Save"} isDisabled={isProcessing} onClick={handleSave}></Button>
                </>
            }
            onClose={() => dispatch(closeModal())}
        >
            <div className={styles.modal_game_content}>

                {/*COVER*/}
                {formData.game &&
                    <div className={styles.modal_game_cover}>
                        <Cover cover={formData.game.cover.image_id} size={"big"} alt={formData.game.name}></Cover>
                    </div>
                }

                {/*GAME TITLE AND FORM*/}
                <div className={styles.modal_game_text_content}>
                    {formData.game &&
                        <h3 className={clsx(styles.modal_game_heading, "app_heading_3")}>
                            {formData.game.name} <span
                            className={styles.modal_game_heading_date}>({convertDate(formData.game.first_release_date).getFullYear()})</span>
                        </h3>
                    }

                    <form className={styles.modal_game_form}>

                        <FormItem label={"Console"} htmlFor={"modalGameConsole"}>
                            <Select
                                name="console"
                                id="modalGameConsole"
                                className="app_select"
                                onChange={(e) => setPlatformId(Number(e.target.value))}
                                value={platformId}
                            >
                                {formData.game && formData.game.platforms?.map((platform: { id: number; name: string }) => (
                                    <option
                                        key={platform.id}
                                        value={platform.id}
                                    >
                                        {platform.name}
                                    </option>
                                ))}
                            </Select>
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