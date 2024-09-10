import { Network } from "@/config"

export const avalancheExplorerUrl = (
    value: string,
    network: Network = Network.Testnet
) => {
    switch (network) {
    case Network.Testnet:
        return {
            address: `https://testnet.snowtrace.io/address/${value}`,
            tx: `https://testnet.snowtrace.io/tx/${value}`,
        }
    case Network.Mainnet:
        return {
            address: `https://snowtrace.io/address/${value}`,
            tx: `https://snowtrace.io/tx/${value}`,
        }
    }
}