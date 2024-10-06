//import { envConfig } from "@/config"
import { setTelegramInfo, useAppDispatch } from "@/redux"
import { retrieveLaunchParams } from "@telegram-apps/sdk"
import { useEffect } from "react"

export const useTelegramMiniApp = () => {
    if (typeof window === "undefined") return
    //if (envConfig().isDev) return
    
    const { initData } = retrieveLaunchParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!initData) return
        dispatch(setTelegramInfo({
            id: initData?.user?.id || 0, 
            username: initData?.user?.username || "",
            referrerUserId: initData?.startParam || ""
        }))
    }, [initData])
}