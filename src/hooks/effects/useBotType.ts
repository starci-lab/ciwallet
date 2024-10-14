import { setBotType, setBotTypeInit, useAppDispatch } from "@/redux"
import { BotType } from "@/services"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const useBotType = () => {
    const searchParams = useSearchParams()
    const botType = searchParams.get("botType") as BotType
    
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!botType) return 
        dispatch(setBotType(botType))
        dispatch(setBotTypeInit(botType))
    }, [botType])
}