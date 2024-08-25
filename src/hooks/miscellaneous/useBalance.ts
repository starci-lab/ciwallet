import { useAppSelector } from "@/redux"
import {  getBalance } from "@/services"
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
}: UseBalanceParams): UseBalanceReturn | undefined => {
    const tokens = useAppSelector((state) => state.tokenReducer.tokens)
    const network = useAppSelector((state) => state.chainReducer.network)

    const { tokens: _tokens } = { ...tokens[chainKey] }
    const token = _tokens.find(({ key }) => key === tokenKey)
    if (!token) return

    const balanceSwr = useSWR(["BALANCE_SWR", tokenKey], async () => {
        const balance = await getBalance({
            chainKey,
            network,
            accountAddress,
            tokenAddress: token.tokenId.address,
        })
        return balance
    })

    return {
        balanceSwr
    }
}
