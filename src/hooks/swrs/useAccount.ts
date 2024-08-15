import { getAccount } from "@/services"
import { AccountPostgresEntity } from "@/types"
import { DeepPartial } from "@apollo/client/utilities"
import { use, useState } from "react"
import useSWR, { SWRResponse } from "swr"
import { HooksContext } from "../provider.hooks"

const ACCOUNT = "account"

export interface UseAccountReturn {
    initialize: () => void;
    accountSwr: SWRResponse<DeepPartial<AccountPostgresEntity>>;
}

export const _useAccount = () : UseAccountReturn => {
    const [initialized, setInitialized] = useState(false)

    const accountSwr = useSWR(initialized ? ACCOUNT : null, async () => {
        return await getAccount({
            input: {
                public_key: "0x"
            },
            schema: {
                aptos_address: true,
            }
        })
    }) 

    const initialize = () => setInitialized(true)

    return {
        initialize,
        accountSwr
    }
}

export const useAccount = () : UseAccountReturn => {
    const { swrs: { account } } = use(HooksContext)!
    return account
}