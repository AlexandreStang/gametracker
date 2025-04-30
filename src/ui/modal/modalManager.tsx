import ModalGameAdd from "@/ui/modal/modalGame/modalGameAdd";
import ModalGameEdit from "@/ui/modal/modalGame/modalGameEdit";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/store";

export default function ModalManager() {
    const { isOpen, mode, igdbId, playedGameId} = useSelector((state: RootState) => state.modal);
    const dispatch = useDispatch<AppDispatch>();

    if (!isOpen) return null

    if (mode === 'add' && igdbId) {
        return (
            <ModalGameAdd igdbId={igdbId}></ModalGameAdd>
        )
    }

    if (mode === 'edit' && playedGameId) {
        return (
            <ModalGameEdit playedGameId={playedGameId}></ModalGameEdit>
        )
    }
}