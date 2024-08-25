import { chainConfig, defaultChain, defaultSecondaryChain } from "@/config"
import {
    useAppSelector,
    useAppDispatch,
    addToken as reduxAddToken,
} from "@/redux"
import { getWrappedAsset } from "@/services"
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
    const tokens = useAppSelector(state => state.tokenReducer.tokens)

    const addTokenSwrMutation = useSWRMutation("ADD_TOKEN_SWR_MUTATION", async () => {
        if (!vaa) return

        const token = tokens[vaa.fromChainKey].tokens.find(({key}) => key === vaa.tokenKey)
        if (!token) return
        const { imageUrl, tokenId } = token

        const sourceChain = chainConfig().chains.find(({ key }) => key === vaa.fromChainKey)
        const foreignChain = chainConfig().chains.find(({ key }) => key === vaa.targetChainKey)

        const address = await getWrappedAsset({
            network,
            sourceChainName: sourceChain?.chain ?? defaultChain,
            foreignChainName: foreignChain?.chain ?? defaultSecondaryChain,
            sourceTokenAddress: tokenId.address.toString(),
        })
        console.log("address", address)
        dispatch(
            reduxAddToken({
                chainKey: vaa.targetChainKey,
                tokenInfo: {
                    imageUrl,
                    tokenId: {
                        address,
                        chain: foreignChain?.chain ?? defaultSecondaryChain,
                    }
                }
            })
        )
    }) 

    return {
        addTokenSwrMutation,
    }
}
