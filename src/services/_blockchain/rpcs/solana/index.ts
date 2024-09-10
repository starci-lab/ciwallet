import { Network } from "@/config"
import { Cluster, Connection, clusterApiUrl } from "@solana/web3.js"

export const solanaClient = (network: Network = Network.Testnet) => {
    const networkMap: Record<Network, Cluster> = {
        [Network.Mainnet]: "mainnet-beta",
        [Network.Testnet]: "devnet",
    }
    return new Connection(clusterApiUrl(networkMap[network]), {
        commitment: "confirmed",
    })
}