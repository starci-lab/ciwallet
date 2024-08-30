import { Network } from "@/services"
import { _getBalance } from "../common"
import { chainConfig } from "@/config"

export const bscExplorerUrls = (
    value: string,
    network: Network = Network.Testnet
) => {
    switch (network) {
    case Network.Devnet:
        throw new Error("Devnet is not supported for Klaytn")
    case Network.Testnet:
        return {
            address: `https://testnet.bscscan.com/address/${value}`,
            tx: `https://testnet.bscscan.com/tx/${value}`,
        }
    case Network.Mainnet:
        return {
            address: `https://bscscan.com/address/${value}`,
            tx: `https://bscscan.com/tx/${value}`,
        }
    }
}

export const BSC_TESTNET_RPC_URL = "https://data-seed-prebsc-2-s1.binance.org:8545/"
export const BSC_MAINNET_RPC_URL = "https://bsc-dataseed.binance.org/"

export const getBscRpc = (network: Network) => {
    let rpcUrl = ""
    switch (network) {
    case Network.Mainnet:
    {
        rpcUrl = BSC_MAINNET_RPC_URL
        break
    }
                
    case Network.Testnet:
    {
        rpcUrl = BSC_TESTNET_RPC_URL
        break
    }
    case Network.Devnet:
        throw new Error("Devnet is not supported for Bsc")
    }
    return rpcUrl
}


export const getBscBalance = async (
    accountAddress: string,
    tokenAddress: string,
    network: Network = Network.Testnet
) => {
    const rpcUrl = getBscRpc(network)
    return _getBalance(accountAddress, tokenAddress, rpcUrl, chainConfig().chains.bsc.tokens[0].decimals)
}
