"use client"

import { useCifarmNakama } from "@/hooks"
import React, { PropsWithChildren, useEffect } from "react"

const Layout = ({ children }: PropsWithChildren) => {
    const { authSwr, client } = useCifarmNakama()
    useEffect(() => {
        console.log("Data sent")
    }, [])

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
