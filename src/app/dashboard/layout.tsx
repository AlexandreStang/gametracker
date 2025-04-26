'use client'

import Sidebar from "@/ui/sidebar/sidebar";
import styles from "@/styles/modules/dashboard.module.css"
import {GameSelectionProvider} from "@/context/gameSelectionContext";
import Header from "@/ui/header/header";
import clsx from "clsx";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <GameSelectionProvider>
            <Header>

            </Header>
            <div className="app_wrapper_xl">
                <div className={clsx(styles.dashboard_layout, "app_wrapper_margin")}>
                    <Sidebar></Sidebar>
                    <div className={styles.dashboard_content}>
                        {children}
                    </div>
                </div>
            </div>
        </GameSelectionProvider>
    );
}