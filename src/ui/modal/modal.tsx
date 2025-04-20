import styles from "@/styles/modal.module.css"
import {XMarkIcon} from "@heroicons/react/24/solid";
import clsx from "clsx";
import ButtonIcon from "@/ui/button/buttonIcon";

interface ModalProps {
    header?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    onClose?: () => void;
}

export default function Modal({header, children, footer, onClose}: ModalProps) {

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={clsx(styles.modal_header, styles.modal_wrapper_header)}>
                    <span className={styles.modal_heading}>
                        {header}
                    </span>
                    <ButtonIcon>
                        <XMarkIcon></XMarkIcon>
                    </ButtonIcon>
                </div>
                <div className={clsx(styles.modal_content, styles.modal_wrapper)}>
                    {children}
                </div>
                <div className={clsx(styles.modal_footer, styles.modal_wrapper)}>
                    {footer}
                </div>
            </div>
        </div>
    )
}