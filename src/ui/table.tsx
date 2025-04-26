import styles from "@/styles/modules/table.module.css"

interface TableProps {
    children?: React.ReactNode;
}

export default function Table({children}: TableProps) {

    return (
        <table className={styles.table}>
            {children}
        </table>
    )
}