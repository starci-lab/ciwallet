import { Network } from "@/config"
import { Aptos, AptosConfig, Network as AptosNetwork } from "@aptos-labs/ts-sdk"

export const aptosConfig = (network: Network = Network.Testnet) => {
    const networkMap: Record<Network, AptosNetwork> = {
        [Network.Testnet]: AptosNetwork.TESTNET,
        [Network.Mainnet]: AptosNetwork.MAINNET,
    }
    return new AptosConfig({ network: networkMap[network] })
}
export const aptosClient = (network: Network = Network.Testnet) =>
    new Aptos(aptosConfig(network))