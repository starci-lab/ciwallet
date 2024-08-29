import { useAppSelector } from "@/redux"
import { TokenMetadata, getTokenMetadata } from "@/services"
import useSWR, { SWRResponse } from "swr"

export interface UseTokenMetadataParams {
  tokenKey: string;
  chainKey: string;
}

export interface UseTokenMetadataReturn {
  tokenMetadataSwr: SWRResponse<TokenMetadata | undefined, unknown>;
}

export const useTokenMetadata = ({
    tokenKey,
    chainKey,
}: UseTokenMetadataParams): UseTokenMetadataReturn => {
    const { tokens } = {
        ...useAppSelector((state) => state.tokenReducer.tokens[chainKey]),
    }
    const network = useAppSelector((state) => state.chainReducer.network)
    const { tokenId } = { ...tokens.find((token) => token.key === tokenKey) }
    const { address } = { ...tokenId }

    const tokenMetadataSwr = useSWR(
        ["TOKEN_METADATA_SWR", tokenKey],
        async () => {
            if (!address) return

            return await getTokenMetadata({
                chainKey,
                network,
                tokenAddress: address,
            })
        }
    )

    return {
        tokenMetadataSwr,
    }
}
