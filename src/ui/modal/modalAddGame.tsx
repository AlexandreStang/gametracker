import Modal from "@/ui/modal/modal";
import Button from "@/ui/button/button";

export default function ModalAddGame() {

    return (
        <Modal
            header={"You played..."}
            footer={
                <>
                    <Button text={"Save"}></Button>
                </>
            }
        >
            Hello
        </Modal>
    )
}