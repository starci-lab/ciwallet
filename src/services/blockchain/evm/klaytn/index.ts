import { Network } from "@/services"
import { _getBalance } from "../common"
import { chainConfig } from "@/config"

export const klaytnExplorerUrls = (
    value: string,
    network: Network = Network.Testnet
) => {
    switch (network) {
    case Network.Devnet:
        throw new Error("Devnet is not supported for Klaytn")
    case Network.Testnet:
        return {
            address: `https://baobab.scope.klaytn.foundation/address/${value}`,
            tx: `https://baobab.scope.klaytn.foundation/tx/${value}`,
        }
    case Network.Mainnet:
        return {
            address: `https://scope.klaytn.foundation/address/${value}`,
            tx: `https://scope.klaytn.foundation/tx/${value}`,
        }
    }
}

export const KLAYTN_TESTNET_RPC_URL = "https://public-en-baobab.klaytn.net"
export const KLAYTN_MAINNET_RPC_URL = "https://public-en-cypress.klaytn.net"

export const getKlaytnRpc = (network: Network) => {
    let rpcUrl = ""
    switch (network) {
    case Network.Mainnet: {
        rpcUrl = KLAYTN_MAINNET_RPC_URL
        break
    }

    case Network.Testnet: {
        rpcUrl = KLAYTN_TESTNET_RPC_URL
        break
    }
    case Network.Devnet:
        throw new Error("Devnet is not supported for Klaytn")
    }
    return rpcUrl
}

export const getKlaytnBalance = async (
    accountAddress: string,
    tokenAddress: string,
    network: Network = Network.Testnet
) => {
    const rpcUrl = getKlaytnRpc(network)
    return _getBalance(
        accountAddress,
        tokenAddress,
        rpcUrl,
        chainConfig().chains.bsc.tokens[0].decimals
    )
}
