import {UserCircleIcon} from "@heroicons/react/24/solid";
import styles from "@/styles/modules/user.module.css"

export default function User() {

    return (
        <div className={styles.user}>
            <div>AlexandreStang</div>
            <UserCircleIcon className={styles.user_icon}></UserCircleIcon>
        </div>
    )
}