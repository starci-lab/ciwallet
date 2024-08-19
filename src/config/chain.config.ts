import { ChainId, Chain, Platform } from "@wormhole-foundation/sdk"

export const chainConfig = () : ChainConfig => {
    return {
        chains: [
            {   
                key: "aptos",
                imageUrl: "/icons/aptos.svg",
                wormholeChainId: 22,
                chain: "Aptos",
                platform: "Aptos"
            },
            {
                key: "solana",
                imageUrl: "/icons/solana.svg",
                wormholeChainId: 1,
                chain: "Solana",
                platform: "Solana"
            }
        ]
    }
}

export const defaultChainKey = chainConfig().chains[0].key

export interface ChainInfo {
    key: string,
    wormholeChainId: ChainId,
    imageUrl: string,
    chain: Chain,
    platform: Platform
}

export interface ChainConfig {
    chains: Array<ChainInfo>
}