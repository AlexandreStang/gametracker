import styles from "@/styles/modal.module.css"
import {XMarkIcon} from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function ModalForm() {

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={clsx(styles.modal_header, styles.modal_wrapper)}>
                    <span className={styles.modal_heading}>You played...</span>
                    <XMarkIcon className={styles.modal_header_icon}></XMarkIcon>
                </div>
                <div className={clsx(styles.modal_content, styles.modal_wrapper)}></div>
                <div className={clsx(styles.modal_footer, styles.modal_wrapper)}>
                    <div>Button</div>
                    <div>Button</div>
                </div>
            </div>
        </div>
    )
}