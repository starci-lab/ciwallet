import { Network, SupportedChainKey } from "@/config"
import { Chain, Network as WormholeNetwork } from "@wormhole-foundation/sdk"

export enum Platform {
  Evm = "evm",
  Aptos = "aptops",
  Solana = "solana",
  Algorand = "algorand",
  Sui = "sui",
  Polkadot = "polkadot"
}

export const chainKeyToPlatform = (chainKey: string): Platform => {
    switch (chainKey) {
    case SupportedChainKey.Avalanche:
        return Platform.Evm
    case SupportedChainKey.Bsc:
        return Platform.Evm
    case SupportedChainKey.Solana:
        return Platform.Solana
    case SupportedChainKey.Aptos:
        return Platform.Aptos
    case SupportedChainKey.Algorand:
        return Platform.Algorand
    case SupportedChainKey.Sui:
        return Platform.Sui
    case SupportedChainKey.Polkadot:
        return Platform.Polkadot
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
    case "sui": return "Sui"
    default: throw new Error(`Chain not found : ${chainKey}`)
    }
}

export const chainToChainKey = (chainKey: Chain) : string => {
    switch (chainKey) {
    case "Aptos": return "aptos"
    case "Solana": return "solana"
    case "Avalanche": return "avalanche"
    case "Bsc": return "bsc"
    case "Sui": return "sui"
    default: throw new Error(`Chain not found : ${chainKey}`)
    }
}