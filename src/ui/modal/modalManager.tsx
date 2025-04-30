import ModalGameAdd from "@/ui/modal/modalGame/modalGameAdd";
import ModalGameEdit from "@/ui/modal/modalGame/modalGameEdit";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/store";
import {useEffect, useState} from "react";
import {fetchGameFromIGDB} from "@/api/actions";
import {GameIGDB} from "@/api/types";
import {getFullPlayedGameById} from "@/db/services/playedGameService";

export interface modalGameForm {
    game: GameIGDB
    platformId: number
    playtime: number
    like: boolean
}

export default function ModalManager() {
    const {isOpen, mode, igdbId, playedGameId} = useSelector((state: RootState) => state.modal);
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState<modalGameForm | undefined>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true);

            try {

                if (mode === 'add' && igdbId) {

                    const results = await fetchGameFromIGDB(igdbId);

                    if (results) {
                        setFormData({
                            game: results,
                            platformId: results.platforms[0].id,
                            playtime: 0,
                            like: false
                        })
                    }

                } else if (mode === 'edit' && playedGameId) {

                    const playedGame = await getFullPlayedGameById(playedGameId)

                    if (!playedGame) {
                        setFormData(undefined)
                        return null
                    }

                    const results = await fetchGameFromIGDB(playedGame.game.igdbId);

                    if (results) {
                        setFormData({
                            game: results,
                            platformId: playedGame.platform.igdbId,
                            playtime: playedGame.playtime,
                            like: playedGame.like
                        })
                    }
                }

            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false)
            }
        };

        if (isOpen && (igdbId || playedGameId)) {
            fetchData()
        }

    }, [isOpen, mode, igdbId, playedGameId]);

    if (!isOpen) return null

    if (isLoading) return <div>Loading data...</div>

    if (mode === 'add' && formData) {
        return (
            <ModalGameAdd formData={formData}></ModalGameAdd>
        )
    }

    if (mode === 'edit' && formData) {
        return (
            <ModalGameEdit formData={formData}></ModalGameEdit>
        )
    }

    return null
}