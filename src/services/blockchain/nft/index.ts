import { Network } from "@/config"
import {
    GetNftsByOwnerAddressParams,
    _getNftsByOwnerAddress,
} from "./get-nfts-by-owner-address.nft"
import { CIDService } from "@/services/ipfs"

export interface BlockchainNftServiceConstructorParams {
  nftAddress: string;
  chainKey: string;
  network?: Network;
}

export class BlockchainNftService {
    private cidService: CIDService
    constructor(
        private readonly params: BlockchainNftServiceConstructorParams) {
        params.network = params.network || Network.Testnet
        this.cidService = new CIDService()
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
        }, {
            cidService: this.cidService,
        })
    }
}

export * from "./common"
export * from "./get-nfts-by-owner-address.nft"