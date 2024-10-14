"use client"

import { useCifarmNakama } from "@/hooks"
import { useAppSelector } from "@/redux"
import { AuthenticatorApiService } from "@/services"
import React, { PropsWithChildren, useEffect } from "react"
import useSWR from "swr"

const Layout = ({ children }: PropsWithChildren) => {
    const { authSwr, client } = useCifarmNakama()

    const initDataRaw = useAppSelector(
        (state) => state.authReducer.telegramInfo.initDataRaw
    )
    const botType = useAppSelector(
        (state) => state.authReducer.botType
    )

    useSWR("REGISTER_TELEGRAM", async () => {
        const authenticatorService = new AuthenticatorApiService()
        await authenticatorService.registerTelegram({
            initDataRaw,
            botType
        })
    })
    
    useEffect(() => {
        if (!client) return
        const handleEffect = async () => {
            await authSwr.trigger()
        }
        handleEffect()
    }, [client])

    return <>{children}</>
}

export default Layout
