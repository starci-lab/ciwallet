import { Network } from "@/config"
import { Chain, Network as WormholeNetwork } from "@wormhole-foundation/sdk"

export enum Platform {
  Evm = "evm",
  Aptos = "aptops",
  Solana = "solana",
  Algorand = "algorand"
}

export const chainKeyToPlatform = (chainKey: string): Platform => {
    switch (chainKey) {
    case "avalanche":
        return Platform.Evm
    case "bsc":
        return Platform.Evm
    case "solana":
        return Platform.Solana
    case "aptos":
        return Platform.Aptos
    case "algorand":
        return Platform.Algorand
    default:
        throw new Error(`Chain not supported: ${chainKey}`)
    }
}

export const parseNetwork = (network: Network): WormholeNetwork => {
    switch (network) {
    case Network.Mainnet:
        return "Mainnet"
    case Network.Testnet:
        return "Testnet"
    default:
        throw new Error(`Network not supported: ${network}`)
    }
}

export const parseWormholeNetwork = (network: WormholeNetwork): Network => {
    switch (network) {
    case "Mainnet":
        return Network.Mainnet
    case "Testnet":
        return Network.Testnet
    default:
        throw new Error(`Network not supported: ${network}`)
    }
}

export interface ChainAccount {
  address: string;
  privateKey: string;
  publicKey: string;
}

export const chainKeyToChain = (chainKey: string) : Chain => {
    switch (chainKey) {
    case "aptos": return "Aptos"
    case "solana": return "Solana"
    case "avalanche": return "Avalanche"
    case "bsc": return "Bsc"
    case "algorand": return "Algorand"
    default: throw new Error(`Chain not found : ${chainKey}`)
    }
}

export const chainToChainKey = (chainKey: Chain) : string => {
    switch (chainKey) {
    case "Aptos": return "aptos"
    case "Solana": return "solana"
    case "Avalanche": return "avalanche"
    case "Bsc": return "bsc"
    default: throw new Error(`Chain not found : ${chainKey}`)
    }
}