"use client"

import React, { PropsWithChildren, createContext } from "react"
import { UseNakamaReturn, _useNakama } from "./useNakama"

interface HookContextsValue {
    nakama : UseNakamaReturn
}
export const HooksContext = createContext<HookContextsValue | null>(null)

export const HooksProvider = ({ children } : PropsWithChildren) => {
    const nakama = _useNakama()
    
    return (
        <HooksContext.Provider value={{
            nakama,
        }}>
            {children}
        </HooksContext.Provider>
    )
}