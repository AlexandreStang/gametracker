import styles from "@/styles/modules/button/button.module.css"
import clsx from "clsx";

interface ButtonProps {
    text?: string
    isDisabled?: boolean
    onClick?: () => void
}

export default function Button({text, isDisabled = false, onClick}: ButtonProps) {

    const handleClick = () => {
        if (onClick && !isDisabled) {
            onClick()
        }
    }

    return (
        <button
            className={clsx(styles.button, {
                [styles.button_enabled] : !isDisabled,
                [styles.button_disabled] : isDisabled
            })}
            onClick={handleClick}>
            {text}
        </button>
    )
}