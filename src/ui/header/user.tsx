import {UserCircleIcon} from "@heroicons/react/24/solid";
import styles from "@/styles/modules/user.module.css"
import clsx from "clsx";

export default function User() {

    return (
        <div className={styles.user}>
            <div>AlexandreStang</div>
            <UserCircleIcon className={clsx(styles.user_icon, "app_icon_lg")}></UserCircleIcon>
        </div>
    )
}