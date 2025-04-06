import {formatHours} from "@/lib/utils";
import ButtonLike from "@/ui/button/buttonLike";
import ButtonEdit from "@/ui/button/buttonEdit";
import styles from "@/styles/collectionTable.module.css"

export default function CollectionGame() {

    return (
        <tr>
            <td className={styles.td_rank}>#1</td>
            <td className={styles.td_game}>Terraria</td>
            <td className={styles.td_release}>2011</td>
            <td className={styles.td_support}>PC</td>
            <td className={styles.td_playtime}>{formatHours(789)}</td>
            <td className={styles.td_like}>
                <div className="flex justify-center items-center">
                    <ButtonLike></ButtonLike>
                </div>
            </td>
            <td className={styles.td_edit}>
                <div className="flex justify-center items-center">
                    <ButtonEdit></ButtonEdit>
                </div>
            </td>
        </tr>
    )
}