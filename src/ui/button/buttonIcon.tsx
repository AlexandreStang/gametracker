import styles from "@/styles/button.module.css"

interface ButtonIconProps {
    children?: React.ReactNode;
}

export default function ButtonIcon({children}: ButtonIconProps) {

    return (
        <div className={styles.button_icon}>
            <div className={styles.button_icon_inner}>
                {children}
            </div>
        </div>
    )
}