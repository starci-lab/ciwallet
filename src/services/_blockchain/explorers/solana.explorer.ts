import { Network } from "@/config"

export const solanaExplorerUrl = (
    value: string,
    network: Network = Network.Testnet
) => {
    switch (network) {
    case Network.Testnet:
        return {
            address: `https://explorer.solana.com/address/${value}?cluster=devnet`,
            tx: `https://explorer.solana.com/tx/${value}?cluster=devnet`,
        }
    case Network.Mainnet:
        return {
            address: `https://explorer.solana.com/address/${value}`,
            tx: `https://explorer.solana.com/tx/${value}`,
        }
    }
}