
import { Network } from "@/config"
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client"

const networkMap: Record<Network,"mainnet"|"testnet" > = {
    [Network.Mainnet]: "mainnet",
    [Network.Testnet]: "testnet"
}

export const suiClient = (network: Network) => {
    const suiNetwork = networkMap[network]
    const rpcUrl = getFullnodeUrl(suiNetwork)
    return new SuiClient({ url: rpcUrl })
}
