import { Network } from "@/config"

export const aptosExplorerUrl = (
    value: string,
    network: Network = Network.Testnet
) => {
    switch (network) {
    case Network.Testnet:
        return {
            address: `https://explorer.aptoslabs.com/account/${value}?network=testnet`,
            tx: `https://explorer.aptoslabs.com/txn/${value}?network=testnet`,
        }
    case Network.Mainnet:
        return {
            address: `https://explorer.aptoslabs.com/account/${value}?network=mainnet`,
            tx: `https://explorer.aptoslabs.com/txn/${value}?network=mainnet`,
        }
    }
}