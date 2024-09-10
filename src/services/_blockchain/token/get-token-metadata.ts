import { Network, blockchainConfig } from "@/config"
import { Contract, JsonRpcProvider } from "ethers"
import { aptosClient, evmHttpRpcUrl } from "../rpcs"
import { erc20Abi } from "../abis"
import { Platform, chainKeyToPlatform } from "../common"

export interface GetTokenMetadataParams {
  chainKey: string;
  tokenKey: string;
  network?: Network;
}

export interface TokenMetadata {
  symbol: string;
  name: string;
  decimals: number;
}

export const _getEvmTokenMetadata = async ({
    chainKey,
    tokenKey,
    network,
}: GetTokenMetadataParams): Promise<TokenMetadata> => {
    network = network || Network.Testnet
    const tokenAddress =
    blockchainConfig().chains[chainKey].tokens[tokenKey].addresses[network]

    if (chainKey === "native") throw new Error("native not support")

    network = network || Network.Testnet
    const rpcUrl = evmHttpRpcUrl(chainKey, network)
    const provider = new JsonRpcProvider(rpcUrl)
    const contract = new Contract(tokenAddress, erc20Abi, provider)
    const [_name, _symbol, _decimals] = await Promise.all([
        contract.getFunction("name").staticCall(),
        contract.getFunction("symbol").staticCall(),
        contract.getFunction("decimals").staticCall(),
    ])

    return {
        name: _name,
        decimals: _decimals,
        symbol: _symbol,
    }
}

export const _getAptosTokenMetadata = async ({
    chainKey,
    tokenKey,
    network,
}: GetTokenMetadataParams): Promise<TokenMetadata> => {
    network = network || Network.Testnet
    const tokenAddress =
    blockchainConfig().chains[chainKey].tokens[tokenKey].addresses[network]

    if (chainKey === "native") throw new Error("native not support")
    network = network || Network.Testnet
    const { name, symbol, decimals } = await aptosClient(
        network
    ).getFungibleAssetMetadataByAssetType({ assetType: tokenAddress })

    return {
        name,
        decimals,
        symbol,
    }
}

export const _getSolanaTokenMetadata = async ({
    chainKey,
}: GetTokenMetadataParams): Promise<TokenMetadata> => {
    if (chainKey === "native") throw new Error("native not support")
    // network = network || Network.Testnet
    // const { name, symbol, decimals } = await solanaClient(
    //     network
    // ).get({ assetType: tokenAddress })

    return {
        name: "",
        decimals: 0,
        symbol: "",
    }
}

export const _getTokenMetadata = async (params: GetTokenMetadataParams) => {
    params.network = params.network || Network.Testnet
    const { decimals, symbol, name } =
    blockchainConfig().chains[params.chainKey].tokens[params.tokenKey]
    if (params.chainKey === "native")
        return {
            decimals,
            name,
            symbol,
        }

    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Evm:
        return _getEvmTokenMetadata(params)
    case Platform.Aptos:
        return _getAptosTokenMetadata(params)
    case Platform.Solana:
        return _getSolanaTokenMetadata(params)
    }
}
