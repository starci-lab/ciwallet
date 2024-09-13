"use client"

import React, { createContext, PropsWithChildren } from "react"
import { _useModals, UseModalReturn } from "./modals"
import { useEffects } from "./effects"
import { _useFormiks, UseFormiksReturn } from "./formiks"
import { _useBase, UseBaseReturn } from "./base"

interface HookContextsValue {
    modals: UseModalReturn
    formiks: UseFormiksReturn
    base: UseBaseReturn
}
export const HooksContext = createContext<HookContextsValue | null>(null)

export const HooksProvider = ({ children } : PropsWithChildren) => {
    const modals = _useModals()
    const formiks = _useFormiks()
    const base = _useBase()
    useEffects()

    return (
        <HooksContext.Provider value={{
            modals,
            formiks,
            base
        }}>
            {children}
        </HooksContext.Provider>
    )
}