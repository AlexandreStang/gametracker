import Modal from "@/ui/modal/modal";
import Button from "@/ui/button/button";
import Cover from "@/ui/cover";
import styles from "@/styles/modalGame.module.css"
import {useEffect, useState} from "react";
import {fetchGameFromIGDB} from "@/api/actions";
import {GameIGDB} from "@/api/types";
import {convertDate} from "@/lib/utils";

export default function ModalAddGame() {

    const [game, setGame] = useState<GameIGDB | null>(null)
    const [playtime, setPlaytime] = useState<number>(0)
    const [platformId, setPlatformId] = useState<number>(NaN)
    const [like, setLike] = useState<boolean>(false)

    useEffect(() => {

        const fetchGame = async () => {
            try {
                const results = await fetchGameFromIGDB(7346);

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
    }, []);

    return (
        <Modal
            header={"You played..."}
            footer={<Button text={"Save"}></Button>}
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
                        <h3 className={styles.modal_game_heading}>{game.name} <span className={styles.modal_game_heading_date}>({convertDate(game.first_release_date).year})</span></h3>
                    }

                    <form className={styles.modal_game_form}>

                        <div>
                            <div className={"app_label_container"}>
                                <label htmlFor="modalGameConsole">Console</label>
                            </div>
                            <select name="console" id="modalGameConsole">
                                {game && game.platforms?.map((platform: { id: number; name: string }) => (
                                    <option key={platform.id} value={platform.id}>{platform.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.modal_game_form_row}>

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