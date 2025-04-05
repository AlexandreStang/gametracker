import {formatHours} from "@/lib/utils";
import ButtonLike from "@/ui/buttonLike";
import ButtonEdit from "@/ui/buttonEdit";

export default function CollectionGame() {

    return (
        <tr>
            <td>#1</td>
            <td>Terraria</td>
            <td>2011</td>
            <td>PC</td>
            <td>{formatHours(789)}</td>
            <td><ButtonLike></ButtonLike></td>
            <td><ButtonEdit></ButtonEdit></td>
        </tr>
    )
}