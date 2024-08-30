import { useAppSelector } from "@/redux"
import { getBalance } from "@/services"
import useSWR, { SWRResponse } from "swr"

export interface UseBalanceParams {
  accountAddress: string;
  tokenKey: string;
  chainKey: string;
}

export interface UseBalanceReturn {
    balanceSwr: SWRResponse<number, unknown>;
}

export const useBalance = ({
    accountAddress,
    tokenKey,
    chainKey,
}: UseBalanceParams): UseBalanceReturn => {
    const refreshBalanceKey = useAppSelector(state => state.refreshReducer.refreshBalanceKey)
    const tokens = useAppSelector((state) => state.chainReducer.chains[chainKey]).tokens
    const network = useAppSelector((state) => state.chainReducer.network)
    
    const balanceSwr = useSWR(["BALANCE_SWR", tokenKey, refreshBalanceKey], async () => {
        const token = tokens?.find(({ key }) => key === tokenKey)
        if (!token) return 0
        const balance = await getBalance({
            chainKey,
            network,
            accountAddress,
            tokenAddress: token.address,
        })
        return balance
    })

    return {
        balanceSwr
    }
}
