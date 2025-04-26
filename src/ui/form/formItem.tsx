import styles from "@/styles/modules/form/formItem.module.css"
import clsx from "clsx";

interface FormItemProps {
    label?: string
    htmlFor?: string
    isCentered?: boolean
    children: React.ReactNode
}

export default function FormItem({label = "", htmlFor = "", isCentered = false, children}: FormItemProps) {

    return (
        <div className={clsx({
            [styles.form_item_centered]: isCentered
        })}>
            {label &&
                <div className={styles.form_item_label}>
                    <label htmlFor={htmlFor}>{label}</label>
                </div>
            }
            {children}
        </div>
    )
}