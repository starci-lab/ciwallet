import { Network } from "./blockchain.config"

export interface ParachainConfig {
    name: string;
    imageUrl: string;
    rpcUrl: string;
}

export type PolkadotParachainsConfig = Record<string, Record<Network, ParachainConfig>>

export enum PolkadotParachainKey {
    Bifrost = "bifrost",
    UniqueNetwork = "uniqueNetwork"
}

export const polkadotParachainsConfig: () => PolkadotParachainsConfig = () => ({
    [PolkadotParachainKey.Bifrost]: {
        [Network.Mainnet]: {
            name: "Bifrost",
            imageUrl: "/icons/bifrost.png",
            rpcUrl: "",
        },
        [Network.Testnet]: {
            name: "Bifrost Testnet",
            imageUrl: "/icons/bifrost.png",
            rpcUrl: "wss://bifrost-rpc.paseo.liebi.com/ws",
        },
    },
    [PolkadotParachainKey.UniqueNetwork]: {
        [Network.Mainnet]: {
            name: "Unique Network",
            imageUrl: "/icons/unique-network.svg",
            rpcUrl: "",
        },
        [Network.Testnet]: {
            name: "Opal Testnet",
            imageUrl: "/icons/opal-testnet.svg",
            rpcUrl: "wss://ws-opal.unique.network",
        }
    }
})