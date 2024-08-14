"use client"

import { AccountPostgresEntity } from "@/types"
import React, { createContext, PropsWithChildren } from "react"
import { SWRResponse } from "swr"
import { DeepPartial } from "@apollo/client/utilities"
import { UseDisclosureReturn } from "@nextui-org/use-disclosure"
import { useModal } from "./modals"
import { useSwrs } from "./swrs"

interface HookContextsValue {
    swrs: {
        account: {
            initialize: () => void;
            accountSwr: SWRResponse<DeepPartial<AccountPostgresEntity>>;
        }
    },
    modals: {
        inviteModalDiscloresure: UseDisclosureReturn
    }
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