import styles from "@/styles/modules/form/select.module.css"
import clsx from "clsx";
import {ChevronDownIcon} from "@heroicons/react/24/outline";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({children, ...props}: SelectProps) {

    return (
        <div className={styles.select_container}>
            <select {...props} className={clsx("app_select", styles.select)}>
                {children}
            </select>
            <div className={styles.select_icon_container}>
                <ChevronDownIcon className={clsx("app_icon_xxs")}></ChevronDownIcon>
            </div>
        </div>
    )
}