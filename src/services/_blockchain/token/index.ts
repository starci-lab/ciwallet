import {
    Network,
    defaultChainKey,
    nativeTokenKey,
} from "@/config"
import { GetBalanceParams, _getBalance } from "./get-balance.token"

export class BlockchainTokenService {
    private network: Network

    constructor(
        private chainKey: string = defaultChainKey,
        private tokenKey: string = nativeTokenKey,
        network?: Network
    ) {
        this.network = network || Network.Testnet
    }

    public async getBalance({
        accountAddress,
    }: Pick<GetBalanceParams, "accountAddress">) {
        return _getBalance({
            accountAddress,
            chainKey: this.chainKey,
            tokenKey: this.tokenKey,
            network: this.network,
        })
    }

    public async getTokenMetadata({
        accountAddress,
    }: Pick<GetBalanceParams, "accountAddress">) {
        return _getBalance({
            accountAddress,
            chainKey: this.chainKey,
            tokenKey: this.tokenKey,
            network: this.network,
        })
    }
}
