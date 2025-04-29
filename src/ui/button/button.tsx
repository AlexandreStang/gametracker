import styles from "@/styles/modules/button/button.module.css"

interface ButtonProps {
    text?: string
    onClick?: () => void
}

export default function Button({text, onClick}: ButtonProps) {

    return (
        <button className={styles.button} onClick={onClick}>
            {text}
        </button>
    )
}