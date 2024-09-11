"use client"

import React, { createContext, PropsWithChildren } from "react"
import { _useModals, UseModalReturn } from "./modals"
import { useEffects } from "./effects"
import { _useFormiks, UseFormiksReturn } from "./formiks"

interface HookContextsValue {
    modals: UseModalReturn
    formiks: UseFormiksReturn
}
export const HooksContext = createContext<HookContextsValue | null>(null)

export const HooksProvider = ({ children } : PropsWithChildren) => {
    const modals = _useModals()
    const formiks = _useFormiks()
    useEffects()

    return (
        <HooksContext.Provider value={{
            modals,
            formiks
        }}>
            {children}
        </HooksContext.Provider>
    )
}