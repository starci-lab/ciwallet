import { UseAccountReturn, useAccount } from "./useAccount"

export interface UseSwrsReturn {
    account: UseAccountReturn;
}

export const useSwrs = () : UseSwrsReturn => {
    const account = useAccount()
    return {
        account
    }
}