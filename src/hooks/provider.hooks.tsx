"use client"

import React, { createContext, PropsWithChildren } from "react"
import { _useModals, UseModalReturn } from "./modals"
import { _useSwrs, UseSwrsReturn } from "./swrs"
import { useEffects } from "./effects"
import { _useFormiks, UseFormiksReturn } from "./formiks"

interface HookContextsValue {
    swrs: UseSwrsReturn
    modals: UseModalReturn
    formiks: UseFormiksReturn
}
export const HooksContext = createContext<HookContextsValue | null>(null)

export const HooksProvider = ({ children } : PropsWithChildren) => {
    
    const swrs = _useSwrs()
    const modals = _useModals()
    const formiks = _useFormiks()

    useEffects()

    return (
        <HooksContext.Provider value={{
            swrs,
            modals,
            formiks
        }}>
            {children}
        </HooksContext.Provider>
    )
}