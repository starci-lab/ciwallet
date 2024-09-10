import { Network } from "@/config"
import { Network as WormholeNetwork } from "@wormhole-foundation/sdk"

export enum Platform {
  Evm = "evm",
  Aptos = "aptops",
  Solana = "solana",
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
