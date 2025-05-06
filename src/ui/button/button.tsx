import styles from "@/styles/modules/button/button.module.css"
import clsx from "clsx";

interface ButtonProps {
    text?: string
    isDisabled?: boolean
    type?: "default" | "danger"
    onClick?: () => void
}

export default function Button({text, isDisabled = false, type = "default", onClick}: ButtonProps) {

    const handleClick = () => {
        if (onClick && !isDisabled) {
            onClick()
        }
    }

    return (
        <button
            className={clsx(styles.button, {
                [styles.button_enabled] : !isDisabled,
                [styles.button_disabled] : isDisabled,
                [styles.button_danger] : type === "danger"
            })}
            onClick={handleClick}>
            {text}
        </button>
    )
}