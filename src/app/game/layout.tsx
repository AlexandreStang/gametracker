'use client'

import {Provider} from "react-redux";
import {store} from "@/state/store";
import Header from "@/ui/header/header";
import ModalManager from "@/ui/modal/modalManager";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <Provider store={store}>
            <Header></Header>
            <div className="app_wrapper app_wrapper_xl">
                {children}
            </div>
            <ModalManager></ModalManager>
        </Provider>
    )
}