import Modal from "@/ui/modal/modal";
import Button from "@/ui/button/button";
import {closeGameModal} from "@/state/modalGame/modalGameSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/state/store";

export default function ModalGameEdit() {
    const dispatch = useDispatch<AppDispatch>();

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

        </Modal>
    )
}