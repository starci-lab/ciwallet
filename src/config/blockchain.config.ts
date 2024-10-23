import { valuesWithKey } from "@/utils"
import { ChainId, Chain } from "@wormhole-foundation/sdk"

export enum Network {
  Testnet = "testnet",
  Mainnet = "mainnet",
}

export const blockchainConfig = (): ChainConfig => {
    return {
        chains: {
            [SupportedChainKey.Solana]: {
                imageUrl: "/icons/solana.svg",
                wormhole: {
                    chainId: 1,
                    chain: "Solana",
                },
                name: "Solana",
                tokens: {
                    native: {
                        [Network.Mainnet]: {
                            address: "native",
                            imageUrl: "/icons/solana.svg",
                            name: "Solana",
                            symbol: "SOL",
                            decimals: 9,
                        },
                        [Network.Testnet]: {
                            address: "native",
                            imageUrl: "/icons/solana.svg",
                            name: "Solana",
                            symbol: "SOL",
                            decimals: 9,
                        },
                    },
                    usdc: {
                        [Network.Mainnet]: {
                            address: "",
                            imageUrl: "/icons/usdc.svg",
                            name: "USD Coin",
                            symbol: "USDC",
                            decimals: 6,
                        },
                        [Network.Testnet]: {
                            address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
                            imageUrl: "/icons/usdc.svg",
                            name: "USD Coin",
                            symbol: "USDC",
                            decimals: 6,
                        },
                    },
                    $CARROT: {
                        [Network.Mainnet]: {
                            address: "",
                            imageUrl: "/icons/$CARROT.svg",
                            name: "$CARROT Token",
                            symbol: "$CARROT",
                            decimals: 6,
                        },
                        [Network.Testnet]: {
                            address: "FnQEAh9NNPzE26Z8iBq9onU3gzynGeHbPVy8gdwHFYee",
                            imageUrl: "/icons/$CARROT.png",
                            name: "$CARROT Token",
                            symbol: "$CARROT",
                            decimals: 6,
                        },
                    },
                    $CAULI: {
                        [Network.Mainnet]: {
                            address: "",
                            name: "$CAULI Token",
                            decimals: 18,
                            imageUrl: "/icons/$CAULI.png",
                            symbol: "$CAULI",
                        },
                        [Network.Testnet]: {
                            address: "4XqC5una95jkts6EUcuiicVQr18ZVPhJCzKVj9hYTEC7",
                            name: "$CAULI Token",
                            decimals: 18,
                            imageUrl: "/icons/$CAULI.png",
                            symbol: "$CAULI",
                        },
                    },
                },
                nftGroups: {
                    cifarm: {
                        name: "CiFarm",
                        imageUrl: "/icons/cifarm.png",
                        nfts: {
                            premiumTile: {
                                addresses: {
                                    [Network.Mainnet]: "",
                                    [Network.Testnet]:
                    "E31eadBc4uLfcHRSCLVVDPVngPavmZDVjzdGdjyCkbWZ",
                                },
                                imageUrl: "/icons/premium-tile.png",
                                name: "CiFarm Premium Tile",
                                symbol: "CPT",
                            },
                        },
                    },
                },
            },
            [SupportedChainKey.Avalanche]: {
                imageUrl: "/icons/avalanche.svg",
                wormhole: {
                    chainId: 6,
                    chain: "Avalanche",
                },
                name: "Avalanche",
                tokens: {
                    native: {
                        [Network.Mainnet]: {
                            address: "native",
                            imageUrl: "/icons/avalanche.svg",
                            name: "Avalanche",
                            symbol: "AVAX",
                            decimals: 18,
                        },
                        [Network.Testnet]: {
                            address: "native",
                            imageUrl: "/icons/avalanche.svg",
                            name: "Avalanche",
                            symbol: "AVAX",
                            decimals: 18,
                        },
                    },
                    $CARROT: {
                        [Network.Mainnet]: {
                            address: "",
                            name: "$CARROT Token",
                            decimals: 18,
                            imageUrl: "/icons/$CARROT.png",
                            symbol: "$CARROT",
                        },
                        [Network.Testnet]: {
                            address: "0xA9E72Ae9FfEc2a10AA9b6d617d1faf4953A2dADD",
                            name: "$CARROT Token",
                            decimals: 18,
                            imageUrl: "/icons/$CARROT.png",
                            symbol: "$CARROT",
                        },
                    },
                    $CAULI: {
                        [Network.Mainnet]: {
                            address: "",
                            name: "$CAULI Token",
                            decimals: 18,
                            imageUrl: "/icons/$CAULI.png",
                            symbol: "$CAULI",
                        },
                        [Network.Testnet]: {
                            address: "0x93ED1074fa946946309CdBe0cc873c58d6a725F1",
                            name: "$CAULI Token",
                            decimals: 18,
                            imageUrl: "/icons/$CAULI.png",
                            symbol: "$CAULI",
                        },
                    },
                },
                nftGroups: {
                    cifarm: {
                        name: "CiFarm",
                        imageUrl: "/icons/cifarm.png",

                        nfts: {
                            premiumTile: {
                                addresses: {
                                    [Network.Mainnet]: "",
                                    [Network.Testnet]:
                    "0x410d3e15058e8544B14FD1a317E330f693444673",
                                },
                                imageUrl: "/icons/premium-tile.png",
                                name: "CiFarm Premium Tile",
                                symbol: "CPT",
                            },
                        },
                    },
                },
            },
            [SupportedChainKey.Aptos]: {
                imageUrl: "/icons/aptos.svg",
                wormhole: {
                    chainId: 22,
                    chain: "Aptos",
                },
                name: "Aptos",
                tokens: {
                    native: {
                        [Network.Mainnet]: {
                            address: "native",
                            imageUrl: "/icons/aptos.svg",
                            name: "Aptos",
                            symbol: "APT",
                            decimals: 8,
                        },
                        [Network.Testnet]: {
                            address: "native",
                            imageUrl: "/icons/aptos.svg",
                            name: "Aptos",
                            symbol: "APT",
                            decimals: 8,
                        },
                    },
                    $CARROT: {
                        [Network.Mainnet]: {
                            address: "",
                            name: "$CARROT Token",
                            decimals: 18,
                            imageUrl: "/icons/$CARROT.png",
                            symbol: "$CARROT",
                        },
                        [Network.Testnet]: {
                            address: "",
                            name: "$CARROT Token",
                            decimals: 18,
                            imageUrl: "/icons/$CARROT.png",
                            symbol: "$CARROT",
                        },
                    },
                    $CAULI: {
                        [Network.Mainnet]: {
                            address: "",
                            name: "$CAULI Token",
                            decimals: 18,
                            imageUrl: "/icons/$CAULI.png",
                            symbol: "$CAULI",
                        },
                        [Network.Testnet]: {
                            address: "0x7ba903f5442c6eee5ecdfe49c12a88dcd9843eba117cef40ecc8acf83185b751::coin::T",
                            name: "$CAULI Token",
                            decimals: 18,
                            imageUrl: "/icons/$CAULI.png",
                            symbol: "$CAULI",
                        },
                    },
                },
                nftGroups: {
                    cifarm: {
                        name: "CiFarm",
                        imageUrl: "/icons/cifarm.png",
                        nfts: {
                            premiumTile: {
                                addresses: {
                                    [Network.Mainnet]: "",
                                    [Network.Testnet]:
                    "0x2a86d07b6f49e8794051580e107d96f6feed0d27b52359e8d8c62af32c07cc34",
                                },
                                imageUrl: "/icons/premium-tile.png",
                                name: "CiFarm Premium Tile",
                                symbol: "CPT",
                            },
                        },
                    },
                },
            },
            [SupportedChainKey.Bsc]: {
                imageUrl: "/icons/bsc.svg",
                wormhole: {
                    chainId: 4,
                    chain: "Bsc",
                },
                name: "Binance Smart Chain",
                tokens: {
                    native: {
                        [Network.Mainnet]: {
                            address: "native",
                            imageUrl: "/icons/bsc.svg",
                            name: "Binance Coin",
                            symbol: "tBNB",
                            decimals: 18,
                        },
                        [Network.Testnet]: {
                            address: "native",
                            imageUrl: "/icons/bsc.svg",
                            name: "Binance Coin",
                            symbol: "BNB",
                            decimals: 18,
                        },  
                    },
                    usdt: {
                        [Network.Mainnet]: {
                            address: "",
                            imageUrl: "/icons/usdt.svg",
                            name: "USD Tether",
                            symbol: "USDT",
                            decimals: 18,
                        },
                        [Network.Testnet]: {
                            address: "0xDcbA7F0D49885D5C9e7CDF3e27897a5F3cdfbf62",
                            imageUrl: "/icons/usdt.svg",
                            name: "USD Tether",
                            symbol: "USDT",
                            decimals: 18,
                        },                    
                    },
                },
                nftGroups: {
                    cifarm: {
                        name: "CiFarm",
                        imageUrl: "/icons/cifarm.png",
                        nfts: {},
                    },
                },
            },
            [SupportedChainKey.Algorand]: {
                imageUrl: "/icons/algorand.svg",
                wormhole: {
                    chainId: 8,
                    chain: "Algorand",
                },
                name: "Algorand",
                tokens: {
                    native: {
                        [Network.Mainnet]: {
                            address: "native",
                            imageUrl: "/icons/algorand.svg",
                            name: "Algorand",
                            symbol: "ALGO",
                            decimals: 6,
                        },
                        [Network.Testnet]: {
                            address: "native",
                            imageUrl: "/icons/algorand.svg",
                            name: "Algorand",
                            symbol: "ALGO",
                            decimals: 6,
                        },          
                    },
                    $CARROT: {
                        [Network.Mainnet]: {
                            address: "",
                            name: "$CARROT Token",
                            decimals: 18,
                            imageUrl: "/icons/$CARROT.png",
                            symbol: "$CARROT",
                        },
                        [Network.Testnet]: {
                            address: "",
                            name: "$CARROT Token",
                            decimals: 18,
                            imageUrl: "/icons/$CARROT.png",
                            symbol: "$CARROT",
                        },    
                    },
                    $CAULI: {
                        [Network.Mainnet]: {
                            address: "",
                            name: "$CAULI Token",
                            decimals: 18,
                            imageUrl: "/icons/$CAULI.png",
                            symbol: "$CAULI",
                        },
                        [Network.Testnet]: {
                            address: "",
                            name: "$CAULI Token",
                            decimals: 18,
                            imageUrl: "/icons/$CAULI.png",
                            symbol: "$CAULI",
                        },                       
                    },
                },
                nftGroups: {
                    cifarm: {
                        name: "CiFarm",
                        imageUrl: "/icons/cifarm.png",
                        nfts: {
                            premiumTile: {
                                addresses: {
                                    [Network.Mainnet]: "",
                                    [Network.Testnet]: "premiumTile1",
                                },
                                imageUrl: "/icons/premium-tile.png",
                                name: "CiFarm Premium Tile",
                                symbol: "CPT",
                            },
                        },
                    },
                },
            },
            [SupportedChainKey.Sui]: {
                imageUrl: "/icons/sui.svg",
                wormhole: {
                    chainId: 22,
                    chain: "Sui",
                },
                name: "Sui",
                tokens: {
                    native: {
                        [Network.Mainnet]: {
                            address: "native",
                            imageUrl: "/icons/sui.svg",
                            name: "Sui",
                            symbol: "SUI",
                            decimals: 6,
                        },
                        [Network.Testnet]: {
                            address: "native",
                            imageUrl: "/icons/sui.svg",
                            name: "Sui",
                            symbol: "SUI",
                            decimals: 6,
                        },       
                    },
                    $CARROT: {
                        [Network.Mainnet]: {
                            address: "",
                            name: "$CARROT Token",
                            decimals: 18,
                            imageUrl: "/icons/$CARROT.png",
                            symbol: "$CARROT",
                        },
                        [Network.Testnet]: {
                            address: "",
                            name: "$CARROT Token",
                            decimals: 18,
                            imageUrl: "/icons/$CARROT.png",
                            symbol: "$CARROT",
                        },       
                    },
                    $CAULI: {
                        [Network.Mainnet]: {
                            address: "",
                            name: "$CAULI Token",
                            decimals: 18,
                            imageUrl: "/icons/$CAULI.png",
                            symbol: "$CAULI",
                        },
                        [Network.Testnet]: {
                            address: "",
                            name: "$CAULI Token",
                            decimals: 18,
                            imageUrl: "/icons/$CAULI.png",
                            symbol: "$CAULI",
                        },        
                    },
                },
                nftGroups: {
                    cifarm: {
                        name: "CiFarm",
                        imageUrl: "/icons/cifarm.png",
                        nfts: {
                            premiumTile: {
                                addresses: {
                                    [Network.Mainnet]: "",
                                    [Network.Testnet]:
                    "0x2a86d07b6f49e8794051580e107d96f6feed0d27b52359e8d8c62af32c07cc34",
                                },
                                imageUrl: "/icons/premium-tile.png",
                                name: "CiFarm Premium Tile",
                                symbol: "CPT",
                            },
                        },
                    },
                },
            },
            [SupportedChainKey.Polkadot]: {
                //polkadot is special, we use nfts in unique network
                // and tokens in moonbeam then transfer
                // to bifost
                name: "Polkadot",
                imageUrl: "/icons/polkadot.svg",
                nftGroups: {},
                //polkadot is special network, mainnet is DOT, where testnet is PAS
                tokens: {
                    native: {
                        [Network.Mainnet]: {
                            address: "native",
                            imageUrl: "/icons/polkadot.svg",
                            name: "Polkadot",
                            symbol: "DOT",
                            decimals: 10,
                        },
                        [Network.Testnet]: {
                            address: "native",
                            imageUrl: "/icons/paseo.webp",
                            name: "Paseo",
                            symbol: "PAS",
                            decimals: 10,
                        },
                    },
                    bifrost: {
                        [Network.Mainnet]: {
                            address: "native",
                            imageUrl: "/icons/bifrost.png",
                            name: "Bifrost",
                            symbol: "BNC",
                            decimals: 10,
                        },
                        [Network.Testnet]: {
                            address: "native",
                            imageUrl: "/icons/bifrost.png",
                            name: "Bifrost",
                            symbol: "BNC",
                            decimals: 10,
                        },
                    },
                },
            },
        },
    }
}

export const chains = valuesWithKey(blockchainConfig().chains)
export const chainInfos = valuesWithKey(blockchainConfig().chains)

export const defaultChainKey = chains[0].key
export const defaultChain =
  blockchainConfig().chains[defaultChainKey].wormhole?.chain ?? "Solana"
export const defaultSecondaryChainKey = chains[1].key
export const defaultSecondaryChain =
  blockchainConfig().chains[defaultSecondaryChainKey].wormhole?.chain ??
  "Aptos"

export const nativeTokenKey = "native"

export interface ChainInfo {
  //if wormhole is supported
  wormhole?: {
    chainId: ChainId;
    chain: Chain;
  };
  imageUrl: string;
  name: string;
  tokens: Record<string, Record<Network, TokenInfo>>;
  nftGroups: Record<string, NftGroupInfo>;
}

export interface TokenInfo {
  address: string;
  imageUrl: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface NftGroupInfo {
  imageUrl: string;
  name: string;
  nfts: Record<string, NftInfo>;
}

export interface NftInfo {
  addresses: Record<Network, string>;
  imageUrl: string;
  name: string;
  symbol: string;
}

export interface ChainConfig {
  chains: Record<string, ChainInfo>;
}

export enum SupportedChainKey {
  Sui = "sui",
  Aptos = "aptos",
  Avalanche = "avalanche",
  Solana = "solana",
  Bsc = "bsc",
  Algorand = "algorand",
  Polkadot = "polkadot",
}
