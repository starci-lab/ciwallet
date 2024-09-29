import { Network } from "@/config"
import { Algodv2 } from "algosdk"

export const TESTNET_ALGOD_SERVER_URL = "https://testnet-api.algonode.cloud"
export const TESTNET_INDEXER_SERVER_URL = "https://testnet-idx.algonode.cloud"

export const MAINNET_ALGOD_SERVER_URL = "https://mainnet-api.algonode.cloud"
export const MAINNET_INDEXER_SERVER_URL = "https://mainnet-idx.algonode.cloud"

const networkMap: Record<Network, string> = {
    [Network.Mainnet]: MAINNET_ALGOD_SERVER_URL,
    [Network.Testnet]: TESTNET_ALGOD_SERVER_URL
}

export const algorandClient = (network: Network) => {
    const algorandNetwork = networkMap[network]
    return new Algodv2("", algorandNetwork)
}
