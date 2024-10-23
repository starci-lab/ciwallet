import { Network } from "./blockchain.config"

export interface ParachainConfig {
    name: string;
    imageUrl: string;
    rpcUrl: string;
}

export type PolkadotParachainsConfig = Record<string, Record<Network, ParachainConfig>>

export const polkadotParachainsConfig: () => PolkadotParachainsConfig = () => ({
    bifrost: {
        [Network.Mainnet]: {
            name: "Bifrost",
            imageUrl: "/icons/bifrost.jpeg",
            rpcUrl: "",
        },
        [Network.Testnet]: {
            name: "Bifrost Testnet",
            imageUrl: "/icons/bifrost.jpeg",
            rpcUrl: "wss://bifrost-rpc.paseo.liebi.com/ws",
        },
    },
    uniqueNetwork: {
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