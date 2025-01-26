import { avalancheExplorerUrl } from "./avalanche"
import { aptosExplorerUrl } from "./aptos"
import { bscExplorerUrl } from "./bsc"
import { solanaExplorerUrl } from "./solana"
import { ExplorerUrlParams } from "./types"
import { suiExplorerUrl } from "./sui"
import { algorandExplorerUrl } from "./algorand"
import { SupportedChainKey } from "@/config"
import { nearExplorerUrl } from "./near"

export const explorerUrl = (params: ExplorerUrlParams) => {
    switch (params.chainKey) {
    case SupportedChainKey.Avalanche:
        return avalancheExplorerUrl(params)[params.type]
    case SupportedChainKey.Aptos:
        return aptosExplorerUrl(params)[params.type]
    case SupportedChainKey.Bsc:
        return bscExplorerUrl(params)[params.type]
    case SupportedChainKey.Solana:
        return solanaExplorerUrl(params)[params.type]
    case SupportedChainKey.Sui:
        return suiExplorerUrl(params)[params.type]
    case SupportedChainKey.Algorand:
        return algorandExplorerUrl(params)[params.type]
    case SupportedChainKey.Near:
        return nearExplorerUrl(params)[params.type]
    default:
        throw new Error(`Chain not supported: ${params.chainKey}`)
    }
}

export * from "./protocols"