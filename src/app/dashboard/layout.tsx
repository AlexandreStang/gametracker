'use client'

import Sidebar from "@/ui/sidebar/sidebar";
import styles from "@/styles/modules/dashboard.module.css"
import Header from "@/ui/header/header";
import clsx from "clsx";
import {Provider} from "react-redux";
import {store} from "@/state/store";
import ModalManager from "@/ui/modal/modalManager";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <Header></Header>
            <div className="app_wrapper app_wrapper_xl">
                <div className={clsx(styles.dashboard_layout, "app_wrapper_margin")}>
                    <Sidebar></Sidebar>
                    <div className={styles.dashboard_content}>
                        {children}
                    </div>
                </div>
            </div>
            <ModalManager></ModalManager>
        </Provider>
    );
}