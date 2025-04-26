import styles from "@/styles/buttonIcon.module.css"

interface ButtonIconProps {
    children?: React.ReactNode;
}

export default function ButtonIcon({children}: ButtonIconProps) {

    return (
        <div className={styles.button_icon}>
            <div className="app_icon_sm">
                {children}
            </div>
        </div>
    )
}