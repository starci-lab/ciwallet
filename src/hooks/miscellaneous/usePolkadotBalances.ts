import useSWR, { SWRResponse } from "swr"
import "@polkadot/api-augment"
import { useAppSelector } from "@/redux"
import { bifrostNativeTokenKey, moonbeamNativeTokenKey, nativeTokenKey, uniqueNetworkNativeTokenKey } from "@/config"
import { polkadotRelayChainClient, polkadotUniqueNetworkSdkClient, polkadotMoonbeamProvider, erc20Abi } from "@/services"
import { computeDenomination } from "@/utils"
import { Contract } from "ethers"
import { addressToEvm } from "@polkadot/util-crypto"
import { u8aToHex } from "@polkadot/util"

export interface UsePolkadotBalancesParams {
  address: string;
  tokenKey: string;
}

//we represent the balances of the different networks
export interface PolkadotBalances {
    relay: number;
    bifrost: number;
    moonbeam: number;
    uniqueNetwork: number;
}

export interface UsePolkadotBalancesReturn {
  balancesSwr: SWRResponse<PolkadotBalances | undefined, unknown>;
}

export const usePolkadotBalances = ({
    address,
    tokenKey,
}: UsePolkadotBalancesParams): UsePolkadotBalancesReturn => {
    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
    )
    const chains = useAppSelector((state) => state.blockchainReducer.chains)
    const network = useAppSelector((state) => state.blockchainReducer.network)
    const refreshBalanceKey = useAppSelector(
        (state) => state.refreshReducer.refreshBalanceKey
    )
    const activePrivateKey = useAppSelector(
        (state) => state.authReducer.baseAccounts[preferenceChainKey]?.activePrivateKey
    )

    const decimals =
    chains[preferenceChainKey].tokens[nativeTokenKey][network].decimals
    const balancesSwr = useSWR(
        address ? ["POLKADOT_BALANCES", tokenKey,  refreshBalanceKey, activePrivateKey] : null,
        async (): Promise<PolkadotBalances | undefined> => {
            //clients, providers and sdk clients for the different networks
            const relayChainClient = await polkadotRelayChainClient(network)
            const uniqueNetworkSdkClient = polkadotUniqueNetworkSdkClient(network)
            const moonbeamProvider = polkadotMoonbeamProvider(network)

            const [relayChainBalance, uniqueNetworkBalance, moonbeamBalance] = await Promise.all([
                (async () => {
                    //native only
                    if (tokenKey === bifrostNativeTokenKey) {
                        const account = await relayChainClient.query.system.account(address)
                        return computeDenomination(account.data.free.toNumber(), decimals)
                    }
                    return 0
                })(),
                (async () => {
                    //native only
                    if (tokenKey === uniqueNetworkNativeTokenKey) {
                        const { total, decimals } = await uniqueNetworkSdkClient.balance.get({
                            address,
                        })
                        return computeDenomination(BigInt(total), decimals)
                    }
                    return 0
                })(),
                (async () => {
                    try {
                        const _address = u8aToHex(addressToEvm(address))
                        //native only
                        if (tokenKey === moonbeamNativeTokenKey) {
                            const { decimals } = chains[preferenceChainKey].tokens[nativeTokenKey][network]
                            if (!decimals) throw new Error("decimals must not undefined")
                            const balance = await moonbeamProvider.getBalance(_address)
                            return computeDenomination(balance, decimals)
                        } else {
                            const tokenAddress = chains[preferenceChainKey].tokens[tokenKey][network].address
                            const contract = new Contract(tokenAddress, erc20Abi, moonbeamProvider)
                            const [balance, decimals] = await Promise.all([
                                await contract.getFunction("balanceOf").staticCall(_address),
                                await contract.getFunction("decimals").staticCall(),
                            ])
                            return computeDenomination(balance, Number(decimals))
                        }
                    } catch (error) {
                        console.error(error)
                        return 0
                    }
                })()
            ])     
            return {
                bifrost: 0,
                relay: relayChainBalance,
                uniqueNetwork: uniqueNetworkBalance,
                moonbeam: moonbeamBalance,
            }                        
        }
    )

    return {
        balancesSwr
    }
}
