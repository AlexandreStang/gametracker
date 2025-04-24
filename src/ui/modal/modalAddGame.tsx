import Modal from "@/ui/modal/modal";
import Button from "@/ui/button/button";
import Cover from "@/ui/cover";
import styles from "@/styles/modalGame.module.css"

export default function ModalAddGame() {

    return (
        <Modal
            header={"You played..."}
            footer={
                <Button text={"Save"}></Button>
            }
        >
            <div className={styles.modal_game_content}>
                <div className={styles.modal_game_cover}>
                    <Cover cover={""} size={"big"} alt={""}></Cover>
                </div>
                <div className={styles.modal_game_text_content}>
                    <h3 className={styles.modal_game_heading}>Game Title <span className={styles.modal_game_heading_date}>(Date)</span></h3>
                    <form className={styles.modal_game_form}>

                        <div>
                            <div className={"app_label_container"}>
                                <label htmlFor="modalGameConsole">Console</label>
                            </div>
                            <select name="console" id="modalGameConsole">
                                <option value="">Game 1</option>
                            </select>
                        </div>

                        <div className={styles.modal_game_playtime_like}>

                            <div className={styles.modal_game_playtime}>
                                <div className={"app_label_container"}>
                                    <label htmlFor="modalGamePlaytime">Playtime (in hours)</label>
                                </div>
                                <input type="number" defaultValue="0" min="0" id="modalGamePlaytime"/>
                            </div>

                            <div className={styles.modal_game_like}>
                                <div className={"app_label_container"}>
                                    <label htmlFor="modalGameLike">Like</label>
                                </div>
                                <input type="checkbox" id="modalGameLike"/>
                            </div>

                        </div>

                    </form>
                </div>
            </div>
        </Modal>
    )
}