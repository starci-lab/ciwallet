import { setBotType, setBotTypeInit, useAppDispatch } from "@/redux"
import { BotType } from "@/services"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const useBotType = () => {
    const searchParams = useSearchParams()
    const botType = searchParams.get("botType") as BotType || BotType.Ciwallet

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setBotType(botType))
        dispatch(setBotTypeInit(botType))
    }, [])
}