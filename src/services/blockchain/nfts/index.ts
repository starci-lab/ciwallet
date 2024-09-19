import { Network } from "@/config"
import {
    GetNftsByOwnerAddressParams,
    _getNftsByOwnerAddress,
} from "./get-nfts-by-owner-address.nft"

export interface BlockchainNftServiceConstructorParams {
  nftAddress: string;
  chainKey: string;
  network?: Network;
}

export class BlockchainNftService {
    constructor(private readonly params: BlockchainNftServiceConstructorParams) {
        params.network = params.network || Network.Testnet
    }

    public getNftsByOwnerAddress({
        accountAddress,
        skip,
        take,
    }: Pick<GetNftsByOwnerAddressParams, "accountAddress" | "skip" | "take">) {
        return _getNftsByOwnerAddress({
            accountAddress,
            skip,
            take,
            chainKey: this.params.chainKey,
            network: this.params.network,
            nftAddress: this.params.nftAddress,
        })
    }
}

export * from "./common"
export * from "./get-nfts-by-owner-address.nft"