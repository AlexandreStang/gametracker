import styles from "@/styles/modules/header/header.module.css"
import clsx from "clsx";
import HeaderUser from "@/ui/header/headerUser";
import SearchGames from "@/ui/search/searchGames";

export default function Header() {

    return(
        <header className={styles.header}>
            <div className="app_wrapper app_wrapper_xl">
                <div className={clsx("app_wrapper_margin", styles.header_content)}>
                    {/*PLACEHOLDER LOGO*/}
                    <div className="text-2xl text-center font-extrabold uppercase tracking-widest">
                        Logo
                    </div>
                    <div className="app_wrapper app_wrapper_sm">
                        <SearchGames></SearchGames>
                    </div>
                    <HeaderUser></HeaderUser>
                </div>
            </div>
        </header>
    )
}