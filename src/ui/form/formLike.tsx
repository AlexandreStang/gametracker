import clsx from "clsx";
import styles from "@/styles/modules/toggle.module.css";
import {HeartIcon} from "@heroicons/react/24/solid";
import {useState} from "react";

interface FormLikeProps {
    id: string
    initialLike: boolean
    onChange: (liked: boolean) => void
}

export default function FormLike({id, initialLike, onChange}: FormLikeProps) {

    const [liked, setLiked] = useState<boolean>(initialLike)

    const handleToggle = () => {
        const newValue = !liked
        setLiked(newValue)
        onChange(newValue)
    }

    return (
        <>
            <input
                className={"hidden"}
                type="checkbox"
                id={id}
                checked={liked}
                onChange={handleToggle}
            />
            <HeartIcon
                className={clsx("app_icon_lg", styles.toggle, {
                    [styles.toggle_active] : liked,
                    [styles.toggle_inactive] : !liked
                })}
                onClick={handleToggle}
            ></HeartIcon>
        </>
    )
}