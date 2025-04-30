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

interface modalGameEditProps {
    formData: modalGameForm
}

export default function ModalGameEdit({formData}: modalGameEditProps) {
    const dispatch = useDispatch<AppDispatch>();

    const [playtime, setPlaytime] = useState<number>(formData.playtime)
    const [platformId, setPlatformId] = useState<number>(formData.platformId)
    const [like, setLike] = useState<boolean>(formData.like)

    return (
        <Modal
            header={"You played..."}
            footer={
                <>
                    <Button text={"Delete"}></Button>
                    <Button text={"Save"}></Button>
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
                            className={styles.modal_game_heading_date}>({convertDate(formData.game.first_release_date).year})</span>
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
                                {formData.game && formData.game.platforms?.map((platform: { id: number; name: string }) => (
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