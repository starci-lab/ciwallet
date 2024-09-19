import { ChainId, Chain } from "@wormhole-foundation/sdk"

export enum Network {
  Testnet = "testnet",
  Mainnet = "mainnet",
}

export const blockchainConfig = (): ChainConfig => {
    return {
        chains: {
            avalanche: {
                key: "avalanche",
                imageUrl: "/icons/avalanche.svg",
                wormholeChainId: 6,
                chain: "Avalanche",
                name: "Avalanche",
                tokens: {
                    native: {
                        key: "native",
                        addresses: {
                            [Network.Mainnet]: "native",
                            [Network.Testnet]: "native",
                        },
                        imageUrl: "/icons/avalanche.svg",
                        name: "Avalanche",
                        symbol: "AVAX",
                        decimals: 8,
                    },
                },
                nftGroups: {
                    cifarm: {
                        name: "CiFarm",
                        imageUrl: "/icons/cifarm.png",
                        key: "cifarm",
                        nfts: {
                            premiumTile: {
                                key: "premiumTile",
                                addresses: {
                                    [Network.Mainnet]: "",
                                    [Network.Testnet]: "0x410d3e15058e8544B14FD1a317E330f693444673",
                                },
                                imageUrl: "/icons/premium-tile.png",
                                name: "CiFarm Premium Tile",
                                symbol: "CPT",
                            },
                        },
                    },
                },
            },
            aptos: {
                key: "aptos",
                imageUrl: "/icons/aptos.svg",
                wormholeChainId: 22,
                chain: "Aptos",
                name: "Aptos",
                tokens: {
                    native: {
                        key: "native",
                        addresses: {
                            [Network.Mainnet]: "native",
                            [Network.Testnet]: "native",
                        },
                        imageUrl: "/icons/aptos.svg",
                        name: "Aptos",
                        symbol: "APT",
                        decimals: 8,
                    },
                },
                nftGroups: {
                    cifarm: {
                        name: "CiFarm",
                        imageUrl: "/icons/cifarm.png",
                        key: "cifarm",
                        nfts: {},
                    },
                },
            },
            solana: {
                key: "solana",
                imageUrl: "/icons/solana.svg",
                wormholeChainId: 1,
                chain: "Solana",
                name: "Solana",
                tokens: {
                    native: {
                        key: "native",
                        addresses: {
                            [Network.Mainnet]: "native",
                            [Network.Testnet]: "native",
                        },
                        imageUrl: "/icons/solana.svg",
                        name: "Solana",
                        symbol: "SOL",
                        decimals: 9,
                    },
                    usdc: {
                        key: "usdc",
                        addresses: {
                            [Network.Mainnet]: "",
                            [Network.Testnet]: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
                        },
                        imageUrl: "/icons/usdc.svg",
                        name: "USD Coin",
                        symbol: "USDC",
                        decimals: 6,
                    },
                },
                nftGroups: {
                    cifarm: {
                        name: "CiFarm",
                        imageUrl: "/icons/cifarm.png",
                        key: "cifarm",
                        nfts: {},
                    },
                },
            },
            bsc: {
                key: "bsc",
                imageUrl: "/icons/bsc.svg",
                wormholeChainId: 4,
                chain: "Bsc",
                name: "Binance Smart Chain",
                tokens: {
                    native: {
                        key: "native",
                        imageUrl: "/icons/bsc.svg",
                        name: "Binance Coin",
                        symbol: "BNB",
                        addresses: {
                            [Network.Mainnet]: "native", // Replace with actual address if available
                            [Network.Testnet]: "native", // Replace with actual address if available
                        },
                        decimals: 18,
                    },
                    usdt: {
                        key: "usdt",
                        addresses: {
                            [Network.Mainnet]: "", // Replace with actual address if available
                            [Network.Testnet]: "0xDcbA7F0D49885D5C9e7CDF3e27897a5F3cdfbf62",
                        },
                        imageUrl: "/icons/usdt.svg",
                        name: "USD Tether",
                        symbol: "USDT",
                        decimals: 18,
                    },
                },
                nftGroups: {
                    cifarm: {
                        name: "CiFarm",
                        imageUrl: "/icons/cifarm.png",
                        key: "cifarm",
                        nfts: {},
                    },
                },
            },
        },
    }
}

export const chains = Object.keys(blockchainConfig().chains)
export const chainInfos = Object.values(blockchainConfig().chains)

export const defaultChainKey = blockchainConfig().chains[chains[0]].key
export const defaultChain = blockchainConfig().chains[chains[0]].chain
export const defaultSecondaryChainKey =
  blockchainConfig().chains[chains[1]].key
export const defaultSecondaryChain = blockchainConfig().chains[chains[1]].chain

export const nativeTokenKey = "native"

export interface ChainInfo {
  key: string;
  wormholeChainId: ChainId;
  imageUrl: string;
  chain: Chain;
  name: string;
  tokens: Record<string, TokenInfo>;
  nftGroups: Record<string, NftGroupInfo>;
}

export interface TokenInfo {
  key: string;
  addresses: Record<Network, string>;
  imageUrl: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface NftGroupInfo {
  key: string;
  imageUrl: string;
  name: string;
  nfts: Record<string, NftInfo>;
}

export interface NftInfo {
  key: string;
  addresses: Record<Network, string>;
  imageUrl: string;
  name: string;
  symbol: string;
}

export interface ChainConfig {
  chains: Record<string, ChainInfo>;
}
