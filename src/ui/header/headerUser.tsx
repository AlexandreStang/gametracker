import {UserCircleIcon} from "@heroicons/react/24/solid";
import styles from "@/styles/modules/header/headerUser.module.css"
import clsx from "clsx";

export default function HeaderUser() {

    return (
        <div className={styles.header_user}>
            <div>AlexandreStang</div>
            <UserCircleIcon className={clsx(styles.header_user_icon, "app_icon_lg")}></UserCircleIcon>
        </div>
    )
}