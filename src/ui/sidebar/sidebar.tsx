import styles from "@/styles/modules/sidebar/sidebar.module.css"
import SidebarNavLink from "@/ui/sidebar/sidebarNavLink";

import {ListBulletIcon} from "@heroicons/react/24/outline";
import {ChartBarIcon} from "@heroicons/react/24/outline";
import {UserGroupIcon} from "@heroicons/react/24/outline";
import {Cog6ToothIcon} from "@heroicons/react/24/outline";
import {ArrowRightStartOnRectangleIcon} from "@heroicons/react/24/outline";
import {PuzzlePieceIcon} from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function Sidebar() {

    interface Link {
        text: string;
        icon: React.ElementType;
        href?: string;
        isActive?: boolean;
    }

    const generalLinks: Link[] = [
        {text: "Collection", icon: ListBulletIcon, href: "/dashboard/collection"},
        {text: "Statistics", icon: ChartBarIcon, isActive: false},
        {text: "Community", icon: UserGroupIcon, isActive: false},
    ]

    const accountLinks: Link[] = [
        {text: "Settings", icon: Cog6ToothIcon, isActive: false},
        {text: "Log Out", icon: ArrowRightStartOnRectangleIcon, isActive: false}
    ]

    const renderLinks = (links: Link[]) => {
        return links.map((link, index) => {
            const Icon = link.icon;

            return (
                <SidebarNavLink
                    key={index}
                    href={link.href && link.href}
                    isActive={link.isActive && link.isActive}>
                    <Icon className="app_icon_sm"></Icon>
                    <span>{link.text}</span>
                </SidebarNavLink>
            )
        })
    }

    return (
        <aside className={styles.sidebar}>

            <nav>
                <h2 className={styles.sidebar_category}>General</h2>
                <div>
                    {renderLinks(generalLinks)}
                </div>
            </nav>
            <nav>
                <h2 className={styles.sidebar_category}>Account</h2>
                <div>
                    {renderLinks(accountLinks)}
                </div>
            </nav>
        </aside>
    )
}