import { avalancheExplorerUrl } from "./avalanche.explorer"
import { aptosExplorerUrl } from "./aptos.explorer"
import { bscExplorerUrl } from "./bsc.explorer"
import { solanaExplorerUrl } from "./solana.explorer"
import { ExplorerUrlParams } from "./types.explorer"
import { suiExplorerUrl } from "./sui.explorer"
import { algorandExplorerUrl } from "./algorand.explorer"

export const explorerUrl = (params: ExplorerUrlParams) => {
    switch (params.chainKey) {
    case "avalanche":
        return avalancheExplorerUrl(params)[params.type]
    case "aptos":
        return aptosExplorerUrl(params)[params.type]
    case "bsc":
        return bscExplorerUrl(params)[params.type]
    case "solana":
        return solanaExplorerUrl(params)[params.type]
    case "sui":
        return suiExplorerUrl(params)[params.type]
    case "algorand":
        return algorandExplorerUrl(params)[params.type]
    default:
        throw new Error(`Chain not supported: ${params.chainKey}`)
    }
}

export * from "./protocols.explorer"