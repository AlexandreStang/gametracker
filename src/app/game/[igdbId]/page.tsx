'use client'

import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { openModal } from "@/state/modal/modalSlice";
import {useParams} from "next/navigation";

export default function GamePage() {
    const params = useParams<{igdbId: string}>()

    const dispatch = useDispatch<AppDispatch>();

    const handleClick = () => {
        const igdbId = Number(params.igdbId)

        if (!isNaN(igdbId)) {
            dispatch(openModal({mode: 'add', igdbId: igdbId}));
        }
    }

    return (
        <>
            hello {params.igdbId}
            <button onClick={handleClick}>Open Modal</button>
        </>
    )
}