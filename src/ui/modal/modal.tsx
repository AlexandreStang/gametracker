import styles from "@/styles/modules/modal/modal.module.css"
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
        <div className={styles.modal_overlay}>
            <div className={styles.modal}>
                <div className={styles.modal_header}>
                    <span className="app_heading_4">
                        {header}
                    </span>
                    <ButtonIcon onClick={onClose}>
                        <XMarkIcon></XMarkIcon>
                    </ButtonIcon>
                </div>
                <div className={styles.modal_content}>
                    {children}
                </div>
                <div className={clsx(styles.modal_footer, styles.modal_wrapper)}>
                    {footer}
                </div>
            </div>
        </div>
    )
}