import { use } from "react"
import { UseAccountReturn, _useAccount } from "./useAccount"
import { HooksContext } from "../provider.hooks"

export interface UseSwrsReturn {
    account: UseAccountReturn;
}

export const _useSwrs = () : UseSwrsReturn => {
    const account = _useAccount()
    return {
        account
    }
}

export const useSwrs = () : UseSwrsReturn => {
    const { swrs } = use(HooksContext)!
    return swrs
}

export * from "./useAccount"