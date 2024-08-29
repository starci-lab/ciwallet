import { defaultChain, defaultChainKey, defaultSecondaryChain } from "@/config"
import {
    useAppSelector,
    useAppDispatch,
    addToken as reduxAddToken,
} from "@/redux"
import { getTokenMetadata, getWrappedAsset } from "@/services"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"

export interface UseAddTokenReturn {
    addTokenSwrMutation: SWRMutationResponse<void, unknown, "ADD_TOKEN_SWR_MUTATION">
    hasToken: boolean
}

export const useAddToken = () => {
    const result = useAppSelector((state) => state.resultReducer.bridge.redeem)
    const { vaa } = { ...result }
    
    const dispatch = useAppDispatch()
    const network = useAppSelector((state) => state.chainReducer.network)

    const chains = useAppSelector(state => state.chainReducer.chains)
    const tokens = chains[vaa?.fromChainKey ?? defaultChainKey].tokens

    const addTokenSwrMutation = useSWRMutation("ADD_TOKEN_SWR_MUTATION", async () => {
        if (!vaa) return

        const token = tokens.find(({key}) => key === vaa.tokenKey)
        if (!token) return
        const { imageUrl, address: tokenAddress } = token

        const sourceChain = chains[vaa.fromChainKey]
        const foreignChain = chains[vaa.targetChainKey]

        const address = await getWrappedAsset({
            network,
            sourceChainName: sourceChain?.chain ?? defaultChain,
            foreignChainName: foreignChain?.chain ?? defaultSecondaryChain,
            sourceTokenAddress: tokenAddress,
        })

        const result = await getTokenMetadata({
            network,
            tokenAddress: tokenAddress,
            chainKey: foreignChain?.key ?? defaultSecondaryChain
        })

        result.name = result.name || `Wrapped ${token.name}`
        result.symbol = result.symbol || token.symbol

        dispatch(
            reduxAddToken({
                chainKey: vaa.targetChainKey,
                tokenInfo: {
                    imageUrl,
                    address: address.toString(),
                    ...result,
                }
            })
        )
    }) 

    return {
        addTokenSwrMutation,
    }
}
