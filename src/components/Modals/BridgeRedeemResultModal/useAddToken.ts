import { Network, defaultChainKey, defaultSecondaryChain } from "@/config"
import {
    useAppSelector,
    useAppDispatch,
    addToken as reduxAddToken,
    triggerSaveChains,
} from "@/redux"
import { BlockchainTokenService, getWrappedAsset, parseNetwork } from "@/services"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"

export interface UseAddTokenReturn {
    addTokenSwrMutation: SWRMutationResponse<void, unknown, "ADD_TOKEN_SWR_MUTATION">
    hasToken: boolean
}

export const useAddToken = () => {
    const result = useAppSelector((state) => state.resultReducer.bridge.redeem)
    const { vaa } = { ...result }

    const dispatch = useAppDispatch()
    const network = useAppSelector((state) => state.blockchainReducer.network)

    const chains = useAppSelector(state => state.blockchainReducer.chains)
    const tokens = chains[vaa?.fromChainKey ?? defaultChainKey].tokens

    const addTokenSwrMutation = useSWRMutation("ADD_TOKEN_SWR_MUTATION", async () => {
        if (!vaa) return
        const token = tokens[vaa.tokenKey]
        if (!token) return
        const { imageUrl, addresses } = token
        const tokenAddress = addresses[network]

        const sourceChain = chains[vaa.fromChainKey]
        const foreignChain = chains[vaa.targetChainKey]

        const address = await getWrappedAsset({
            network: parseNetwork(network),
            sourceChainName: sourceChain.chain,
            foreignChainName: foreignChain.chain,
            sourceTokenAddress: tokenAddress,
        })
        console.log(`Wrapped asset address: ${address}`)
        const result = await new BlockchainTokenService({
            chainKey: foreignChain.key ?? defaultSecondaryChain, 
            tokenAddress: address.toString(), 
            network
        }).getTokenMetadata()

        result.name = result.name || `Wrapped ${token.name}`
        result.symbol = result.symbol || token.symbol

        dispatch(
            reduxAddToken({
                chainKey: vaa.targetChainKey,
                tokenInfo: {
                    imageUrl,
                    addresses: {
                        [Network.Mainnet]: network === Network.Mainnet ? address.toString() : "",
                        [Network.Testnet]: network === Network.Testnet ? address.toString() : ""
                    },
                    ...result,
                }
            })
        )

        dispatch(
            triggerSaveChains()
        )
    }) 

    return {
        addTokenSwrMutation,
    }
}
