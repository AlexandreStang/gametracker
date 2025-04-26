import styles from "@/styles/modules/header/header.module.css"
import clsx from "clsx";
import User from "@/ui/header/user";

export default function Header() {

    return(
        <header className={styles.header}>
            <div className="app_wrapper_xl">
                <div className={clsx("app_wrapper_margin", styles.header_content)}>
                    {/*PLACEHOLDER LOGO*/}
                    <div className="text-2xl text-center font-extrabold uppercase tracking-widest">
                        Logo
                    </div>
                    <User></User>
                </div>
            </div>
        </header>
    )
}