import styles from "@/styles/modules/button/buttonIcon.module.css"
import clsx from "clsx";

interface ButtonIconProps {
    children?: React.ReactNode;
}

export default function ButtonIcon({children}: ButtonIconProps) {

    return (
        <div className={clsx(styles.button_icon, "app_icon_xl")}>
            <div className="app_icon_sm">
                {children}
            </div>
        </div>
    )
}