import { Network } from "@/config"
import { avalancheExplorerUrl } from "./avalanche.explorer"
import { aptosExplorerUrl } from "./aptos.explorer"
import { bscExplorerUrl } from "./bsc.explorer"
import { solanaExplorerUrl } from "./solana.explorer"

export const explorerUrl = (chainKey: string, network: Network = Network.Testnet) => {
    switch (chainKey) {
    case "avalanche": return avalancheExplorerUrl(network)
    case "aptos": return aptosExplorerUrl(network)
    case "bsc": return bscExplorerUrl(network)
    case "solana": return solanaExplorerUrl(network)
    default: throw new Error(`Chain not supported: ${chainKey}`)
    }
}