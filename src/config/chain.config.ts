import { ChainId, Chain, Platform, nativeTokenId, TokenId } from "@wormhole-foundation/sdk"
export const chainConfig = () : ChainConfig => {
    return {
        chains: [
            {   
                key: "aptos",
                imageUrl: "/icons/aptos.svg",
                wormholeChainId: 22,
                chain: "Aptos",
                platform: "Aptos",
                name: "Aptos"
            },
            {
                key: "solana",
                imageUrl: "/icons/solana.svg",
                wormholeChainId: 1,
                chain: "Solana",
                platform: "Solana",
                name: "Solana"
            }
        ],
        tokens: [
            {
                key: "aptos",
                tokenId: nativeTokenId("Aptos"),
                imageUrl: "/icons/aptos.svg",
                name: "Aptos",
                symbol: "APT",
                chainKey: "aptos"
            },
            {
                key: "solana",
                tokenId: nativeTokenId("Solana"),
                imageUrl: "/icons/solana.svg",
                name: "Solana",
                symbol: "SOL",
                chainKey: "solana"
            },
        ]
    }
}

export const defaultChainKey = chainConfig().chains[0].key
export const defaultChain = chainConfig().chains[0].chain
export const defaultSecondaryChainKey = chainConfig().chains[1].key
export const defaultSecondaryChain = chainConfig().chains[1].chain

export interface ChainInfo {
    key: string,
    wormholeChainId: ChainId,
    imageUrl: string,
    chain: Chain,
    platform: Platform,
    name: string
}

export interface TokenInfo {
    key: string,
    tokenId: TokenId,
    imageUrl: string,
    name: string,
    symbol: string,
    chainKey: string
}


export interface ChainConfig {
    chains: Array<ChainInfo>,
    tokens: Array<TokenInfo>
}