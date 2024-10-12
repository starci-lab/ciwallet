import { SupportedChainKey } from "./blockchain.config"

export enum SupportedBridgeProtocolKey {
  Wormhole = "wormhole",
}
export interface BridgeProtocol {
  key: SupportedBridgeProtocolKey;
  name: string;
  imageUrl: string;
  warningMsg: string,
  minimalFee: number
}

export interface CrosschainConfig {
  [key: string]: {
    [key: string]: Record<string, BridgeProtocol>;
  };
}

export const wormholeBridgeProtocol: BridgeProtocol = {
    key: SupportedBridgeProtocolKey.Wormhole,
    name: "Wormhole",
    imageUrl: "/icons/wormhole.svg",
    warningMsg: "To ensure a successful wormhole transfer, make sure your native token amount is greater than 0.1.",
    minimalFee: 0.1
}

export const crosschainConfig: CrosschainConfig = {
    [SupportedChainKey.Algorand]: {
        [SupportedChainKey.Aptos]: {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Avalanche]: {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Bsc]: {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Solana]: {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Sui]: {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
    },
    [SupportedChainKey.Aptos]: {
        [SupportedChainKey.Algorand]: {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol
        },
        [SupportedChainKey.Avalanche]: {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Bsc]: {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Solana]: {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Sui]: {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
    },
    [SupportedChainKey.Avalanche]: {
        [SupportedChainKey.Algorand]: {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Aptos]: {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Bsc]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Solana]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Sui]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
    },
    [SupportedChainKey.Bsc]: {
        [SupportedChainKey.Algorand]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Aptos]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Avalanche]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Solana]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Sui]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
    },
    [SupportedChainKey.Solana]: {
        [SupportedChainKey.Algorand]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Aptos]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Avalanche]: {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Bsc]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Sui]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
    },
    [SupportedChainKey.Sui]: {
        [SupportedChainKey.Algorand]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Aptos]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Avalanche]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Bsc]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
        [SupportedChainKey.Solana]:  {
            [SupportedBridgeProtocolKey.Wormhole]: wormholeBridgeProtocol,
        },
    },
}

export const defaultBridgeProtocolKey = SupportedBridgeProtocolKey.Wormhole