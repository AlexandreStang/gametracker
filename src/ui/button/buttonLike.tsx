import {HeartIcon} from "@heroicons/react/24/solid";
import styles from "@/styles/button.module.css";

export default function ButtonLike() {

    return (
        <div className={styles.button_icon}>
            <HeartIcon className={styles.button_like}></HeartIcon>
        </div>
    )
}