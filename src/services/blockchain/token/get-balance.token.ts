import { Network, blockchainConfig } from "@/config"
import { Contract, JsonRpcProvider } from "ethers"
import { aptosClient, evmHttpRpcUrl, solanaClient } from "../rpcs"
import { erc20Abi } from "../abis"
import { computeDenomination } from "@/utils"
import { PublicKey } from "@solana/web3.js"
import { Platform, chainKeyToPlatform } from "../common"

export interface GetBalanceParams {
  chainKey: string;
  tokenKey: string;
  network?: Network;
  accountAddress: string;
}

export const _getEvmBalance = async ({
    chainKey,
    tokenKey,
    network,
    accountAddress,
}: GetBalanceParams): Promise<number> => {
    network = network || Network.Testnet
    const { decimals, addresses } = blockchainConfig().chains[chainKey].tokens[tokenKey]
    const tokenAddress = addresses[network]

    const rpcUrl = evmHttpRpcUrl(chainKey, network)
    const provider = new JsonRpcProvider(rpcUrl)
    if (tokenAddress == "native") {
        if (!decimals) throw new Error("decimals must not undefined")
        const balance = await provider.getBalance(accountAddress)
        return computeDenomination(balance, decimals)
    } else {
        const contract = new Contract(tokenAddress, erc20Abi, provider)
        const [balance, decimals] = await Promise.all([
            await contract.getFunction("balanceOf").staticCall(accountAddress),
            await contract.getFunction("decimals").staticCall(),
        ])
        return computeDenomination(balance, decimals)
    }
}

export const _getAptosBalance = async ({
    chainKey,
    tokenKey,
    network,
    accountAddress,
}: GetBalanceParams): Promise<number> => {
    network = network || Network.Testnet
    const { decimals, addresses } = blockchainConfig().chains[chainKey].tokens[tokenKey]
    const tokenAddress = addresses[network]

    network = network || Network.Testnet
    if (tokenAddress == "native") {
        const balance = await aptosClient(network).getAccountAPTAmount({
            accountAddress
        })
        return computeDenomination(balance, decimals)
    } else {
        const balance = await aptosClient(network).getAccountCoinAmount({
            coinType: tokenAddress as `${string}::${string}::${string}`,
            accountAddress
        })
        return computeDenomination(balance, decimals)
    }
}

export const _getSolanaBalance = async ({
    chainKey,
    tokenKey,
    network,
    accountAddress,
}: GetBalanceParams): Promise<number> => {
    network = network || Network.Testnet
    const { decimals, addresses } = blockchainConfig().chains[chainKey].tokens[tokenKey]
    const tokenAddress = addresses[network]

    network = network || Network.Testnet
    if (tokenAddress == "native") {
        const balance = await solanaClient(network).getBalance(new PublicKey(accountAddress))
        return computeDenomination(balance, decimals)
    } else {
        const result = await solanaClient(network).getParsedTokenAccountsByOwner(
            new PublicKey(accountAddress),
            {
                mint: new PublicKey(tokenAddress),
            }
        )
        return result.value[0].account.data.parsed.info.tokenAmount.uiAmount
    }
}

export const _getBalance = (params: GetBalanceParams) => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Evm: return _getEvmBalance(params)
    case Platform.Aptos: return _getAptosBalance(params)
    case Platform.Solana: return _getSolanaBalance(params)
    }
}