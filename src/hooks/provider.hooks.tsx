import { AccountPostgresEntity } from "@/types"
import React, { createContext, PropsWithChildren } from "react"
import { SWRResponse } from "swr"
import { useAccount } from "./useAccount"
import { DeepPartial } from "@apollo/client/utilities"

interface HookContextsValue {
    account: {
        initialize: () => void;
        accountSwr: SWRResponse<DeepPartial<AccountPostgresEntity>>;
    }
}
export const HooksContext = createContext<HookContextsValue | null>(null)

export const HooksProvider = ({ children } : PropsWithChildren) => {
    const account = useAccount()
    return (
        <HooksContext.Provider value={{
            account
        }}>
            {children}
        </HooksContext.Provider>
    )
}