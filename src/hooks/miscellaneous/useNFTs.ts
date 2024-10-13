import { useAppSelector } from "@/redux"
import {
    BlockchainNftService,
    GetNftsByOwnerAddressResult,
} from "@/services"
import useSWR, { SWRResponse } from "swr"

export interface UseNFTsParams {
  accountAddress: string;
  nftAddress: string;
  chainKey: string;
  skip?: number;
  take?: number;
}

export interface UseNFTsReturn {
    nftsSwr: SWRResponse<GetNftsByOwnerAddressResult, unknown>;
}

export const useNFTs = ({
    accountAddress,
    nftAddress,
    chainKey,
    skip,
    take,
}: UseNFTsParams): UseNFTsReturn => {
    const network = useAppSelector((state) => state.blockchainReducer.network)
    const nftsSwr = useSWR(["NFTS_SWR", nftAddress, accountAddress, skip, take], async () => {
        skip = skip || 0
        take = take || 5
        const nftService = new BlockchainNftService({
            chainKey,
            nftAddress,
            network,
        })
        const emptyResult: GetNftsByOwnerAddressResult = {
            records: [],
            count: 0,
        }
        if (!accountAddress) return emptyResult
        return await nftService.getNftsByOwnerAddress({
            accountAddress,
            skip,
            take,
        })
    })

    return {
        nftsSwr,
    }
}
