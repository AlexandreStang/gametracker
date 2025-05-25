import styles from "@/styles/modules/button/button.module.css"
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    isDisabled?: boolean
    variant?: "default" | "danger"
    onClick?: () => void
    children: React.ReactNode
}

export default function Button({isDisabled = false, variant = "default", onClick, children, ...rest}: ButtonProps) {

    const handleClick = () => {
        if (onClick && !isDisabled) {
            onClick()
        }
    }

    return (
        <button {...rest}
            className={clsx(styles.button, {
                [styles.button_enabled] : !isDisabled,
                [styles.button_disabled] : isDisabled,
                [styles.button_danger] : variant === "danger"
            })}
            onClick={handleClick}>
            {children}
        </button>
    )
}