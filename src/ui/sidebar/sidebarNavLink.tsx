'use client'

import styles from "@/styles/sidebar.module.css"
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from 'next/navigation'

interface SidebarLinkProps {
    children: React.ReactNode;
    href?: string;
    isActive?: boolean;
}

export default function SidebarNavLink({children, href = "", isActive = true}: SidebarLinkProps) {
    const pathname = usePathname();

    return (
        <Link href={href} className={clsx(styles.sidebar_link, {
            [styles.sidebar_link_inactive]: !isActive,
            [styles.sidebar_link_current]: pathname === href
        })}>
            {children}
        </Link>
    )
}