import styles from "@/styles/modules/header/headerUser.module.css"
import clsx from "clsx";
import HeaderUser from "@/ui/header/headerUser";

export default function Header() {

    return(
        <header className={styles.header}>
            <div className="app_wrapper_xl">
                <div className={clsx("app_wrapper_margin", styles.header_content)}>
                    {/*PLACEHOLDER LOGO*/}
                    <div className="text-2xl text-center font-extrabold uppercase tracking-widest">
                        Logo
                    </div>
                    <HeaderUser></HeaderUser>
                </div>
            </div>
        </header>
    )
}