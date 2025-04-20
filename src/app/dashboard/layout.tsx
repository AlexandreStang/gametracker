'use client'

import Sidebar from "@/ui/sidebar/sidebar";
import styles from "@/styles/dashboard.module.css"
import {GameSelectionProvider} from "@/context/gameSelectionContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <GameSelectionProvider>
            <div className={styles.dashboard_top}></div>
            <div className={styles.dashboard_layout}>
                <Sidebar></Sidebar>
                <div className={styles.dashboard_content}>
                    {children}
                </div>
            </div>
        </GameSelectionProvider>
    );
}