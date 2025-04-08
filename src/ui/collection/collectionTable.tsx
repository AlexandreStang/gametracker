import styles from "@/styles/collectionTable.module.css";
import CollectionGame from "@/ui/collection/collectionGame";

export default function CollectionTable() {

    return (
        <table className={styles.collection_table}>
            <thead>
            <tr>
                <th className={styles.th_rank}>Rank</th>
                <th className={styles.th_game}>Game</th>
                <th className={styles.th_release}>Released</th>
                <th className={styles.th_support}>Support</th>
                <th className={styles.th_playtime}>Playtime</th>
                <th className={styles.th_like}>Like</th>
                <th className={styles.th_edit}>Edit</th>
            </tr>
            </thead>
            <tbody>
            <CollectionGame></CollectionGame>
            <CollectionGame></CollectionGame>
            <CollectionGame></CollectionGame>
            <CollectionGame></CollectionGame>
            <CollectionGame></CollectionGame>
            <CollectionGame></CollectionGame>
            <CollectionGame></CollectionGame>
            <CollectionGame></CollectionGame>
            <CollectionGame></CollectionGame>
            <CollectionGame></CollectionGame>
            <CollectionGame></CollectionGame>
            <CollectionGame></CollectionGame>
            <CollectionGame></CollectionGame>
            </tbody>
        </table>
    )
}