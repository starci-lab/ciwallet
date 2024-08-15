"use client"

import React, { createContext, PropsWithChildren } from "react"
import { useModal, UseModalReturn } from "./modals"
import { useSwrs, UseSwrsReturn } from "./swrs"

interface HookContextsValue {
    swrs: UseSwrsReturn
    modals: UseModalReturn
}
export const HooksContext = createContext<HookContextsValue | null>(null)

export const HooksProvider = ({ children } : PropsWithChildren) => {
    
    const swrs = useSwrs()
    const modals = useModal()

    return (
        <HooksContext.Provider value={{
            swrs,
            modals
        }}>
            {children}
        </HooksContext.Provider>
    )
}