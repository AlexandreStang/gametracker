import ModalGameAdd from "@/ui/modal/modalGame/modalGameAdd";
import ModalGameEdit from "@/ui/modal/modalGame/modalGameEdit";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/store";

export default function ModalGame() {
    const { isOpen, mode, igdbId, gameId, userId } = useSelector((state: RootState) => state.modalGame);
    const dispatch = useDispatch<AppDispatch>();

    if (!isOpen) return null

    if (mode === 'add' && igdbId && userId) {
        return (
            <ModalGameAdd igdbId={igdbId} userId={userId}></ModalGameAdd>
        )
    }

    if (mode === 'edit' && gameId && userId) {
        return (
            <ModalGameEdit></ModalGameEdit>
        )
    }
}