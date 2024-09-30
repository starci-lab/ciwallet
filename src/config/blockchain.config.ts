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
                        decimals: 18,
                    },
                    $CARROT: {
                        key: "$CARROT",
                        addresses: {
                            [Network.Mainnet]: "",
                            [Network.Testnet]: "0xA9E72Ae9FfEc2a10AA9b6d617d1faf4953A2dADD",
                        },
                        name: "$CARROT Token",
                        decimals: 18,
                        imageUrl: "/icons/$CARROT.png",
                        symbol: "$CARROT"
                    },
                    $CAULI: {
                        key: "$CAULI",
                        addresses: {
                            [Network.Mainnet]: "",
                            [Network.Testnet]: "0x93ED1074fa946946309CdBe0cc873c58d6a725F1",
                        },
                        name: "$CAULI Token",
                        decimals: 18,
                        imageUrl: "/icons/$CAULI.png",
                        symbol: "$CAULI"
                    }
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
                    $CARROT: {
                        key: "$CARROT",
                        addresses: {
                            [Network.Mainnet]: "",
                            [Network.Testnet]: "",
                        },
                        name: "$CARROT Token",
                        decimals: 18,
                        imageUrl: "/icons/$CARROT.png",
                        symbol: "$CARROT"
                    },
                    $CAULI: {
                        key: "$CAULI",
                        addresses: {
                            [Network.Mainnet]: "",
                            [Network.Testnet]: "0x7ba903f5442c6eee5ecdfe49c12a88dcd9843eba117cef40ecc8acf83185b751::coin::T",
                        },
                        name: "$CAULI Token",
                        decimals: 18,
                        imageUrl: "/icons/$CAULI.png",
                        symbol: "$CAULI"
                    }
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
                                    [Network.Testnet]: "0x2a86d07b6f49e8794051580e107d96f6feed0d27b52359e8d8c62af32c07cc34",
                                },
                                imageUrl: "/icons/premium-tile.png",
                                name: "CiFarm Premium Tile",
                                symbol: "CPT",
                            },
                        },
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
                    $CARROT: {
                        key: "$CARROT",
                        addresses: {
                            [Network.Mainnet]: "",
                            [Network.Testnet]: "FnQEAh9NNPzE26Z8iBq9onU3gzynGeHbPVy8gdwHFYee",
                        },
                        name: "$CARROT Token",
                        decimals: 18,
                        imageUrl: "/icons/$CARROT.png",
                        symbol: "$CARROT"
                    },
                    $CAULI: {
                        key: "$CAULI",
                        addresses: {
                            [Network.Mainnet]: "",
                            [Network.Testnet]: "4XqC5una95jkts6EUcuiicVQr18ZVPhJCzKVj9hYTEC7",
                        },
                        name: "$CAULI Token",
                        decimals: 18,
                        imageUrl: "/icons/$CAULI.png",
                        symbol: "$CAULI"
                    }
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
                                    [Network.Testnet]: "E31eadBc4uLfcHRSCLVVDPVngPavmZDVjzdGdjyCkbWZ",
                                },
                                imageUrl: "/icons/premium-tile.png",
                                name: "CiFarm Premium Tile",
                                symbol: "CPT",
                            },
                        },
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
            algorand: {
                key: "algorand",
                imageUrl: "/icons/algorand.svg",
                wormholeChainId: 8,
                chain: "Algorand",
                name: "Algorand",
                tokens: {
                    native: {
                        key: "native",
                        imageUrl: "/icons/algorand.svg",
                        name: "Algorand",
                        symbol: "ALGO",
                        addresses: {
                            [Network.Mainnet]: "native", // Replace with actual address if available
                            [Network.Testnet]: "native", // Replace with actual address if available
                        },
                        decimals: 6,
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
