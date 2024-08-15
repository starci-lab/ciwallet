"use client"

import React, { createContext, PropsWithChildren } from "react"
import { _useModal, UseModalReturn } from "./modals"
import { _useSwrs, UseSwrsReturn } from "./swrs"

interface HookContextsValue {
    swrs: UseSwrsReturn
    modals: UseModalReturn
}
export const HooksContext = createContext<HookContextsValue | null>(null)

export const HooksProvider = ({ children } : PropsWithChildren) => {
    
    const swrs = _useSwrs()
    const modals = _useModal()

    return (
        <HooksContext.Provider value={{
            swrs,
            modals
        }}>
            {children}
        </HooksContext.Provider>
    )
}