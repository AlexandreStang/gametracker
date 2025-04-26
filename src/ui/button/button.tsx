import styles from "@/styles/modules/button/button.module.css"

interface ButtonProps {
    text?: string
}

export default function Button({text}: ButtonProps) {

    return (
        <button className={styles.button}>
            {text}
        </button>
    )
}