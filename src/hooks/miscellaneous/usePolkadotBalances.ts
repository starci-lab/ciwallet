import useSWR, { SWRResponse } from "swr"
import "@polkadot/api-augment"
import { useAppSelector } from "@/redux"
import { nativeTokenKey } from "@/config"
import { computeDenomination } from "@/utils"
import { polkadotRelayClient } from "@/services"

export interface UsePolkadotBalancesParams {
    address: string
}

export interface UsePolkadotBalancesReturn {
    //balance in relay chain and each parachains
    relayChainSwr: SWRResponse<number, unknown, unknown>
    // bifrost: number
    // moonbeam: number
    // phalaNetwork: number
    // apillon: number
    // uniqueNetwork: number
    // //total
    total : () => number
}

export const usePolkadotBalances = ({ address }: UsePolkadotBalancesParams) : UsePolkadotBalancesReturn => {
    const preferenceChainKey = useAppSelector((state) => state.blockchainReducer.preferenceChainKey)
    const chains = useAppSelector((state) => state.blockchainReducer.chains)
    const network = useAppSelector((state) => state.blockchainReducer.network)

    const decimals = chains[preferenceChainKey].tokens[nativeTokenKey][network].decimals
    const relayChainSwr = useSWR(address ? ["POLKADOT_RELAY_CHAIN"] : null, async () => {
        const relayClient = await polkadotRelayClient(network)
        const { data: { free: relayChainBalance }}  = await relayClient.query.system.account(address)
        return computeDenomination(relayChainBalance.toBigInt(), decimals) 
    })

    return {
        relayChainSwr,
        total: () => {
            return relayChainSwr.data || 0
        }
    }
}