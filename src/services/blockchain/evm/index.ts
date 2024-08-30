import { Network, getBscRpc, getKlaytnRpc } from "@/services"
import { Chain } from "@wormhole-foundation/sdk"

export * from "./abi"
export * from "./bsc"
export * from "./common"
export * from "./bsc"
export * from "./klaytn"

export const getEvmRpc = (chain: Chain, network: Network = Network.Testnet) => {
    switch (chain) {
    case "Bsc": return getBscRpc(network)
    case "Klaytn": return getKlaytnRpc(network)
    }
}