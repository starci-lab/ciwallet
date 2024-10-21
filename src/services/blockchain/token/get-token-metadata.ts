import { Network, blockchainConfig } from "@/config"
import { Contract, JsonRpcProvider } from "ethers"
import { algorandAlgodClient, aptosClient, evmHttpRpcUrl, solanaHttpRpcUrl, suiClient } from "../rpcs"
import { erc20Abi } from "../abis"
import { Platform, chainKeyToPlatform } from "../common"
import { fetchDigitalAsset, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { publicKey } from "@metaplex-foundation/umi"

export interface GetTokenMetadataParams {
  chainKey: string;
  tokenAddress: string;
  network?: Network;
}

export interface TokenMetadata {
  symbol: string;
  name: string;
  decimals: number;
}

export const _getEvmTokenMetadata = async ({
    chainKey,
    network,
    tokenAddress
}: GetTokenMetadataParams): Promise<TokenMetadata> => {
    if (!tokenAddress) throw new Error("Token address not found")
    if (tokenAddress === "native") {
        const { decimals, symbol, name } =
    blockchainConfig().chains[chainKey].tokens["native"]
        return {
            decimals,
            name,
            symbol,
        }
    }
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
    network,
    tokenAddress
}: GetTokenMetadataParams): Promise<TokenMetadata> => {
    if (!tokenAddress) throw new Error("Token address not found")
    if (tokenAddress === "native") {
        const { decimals, symbol, name } =
        blockchainConfig().chains[chainKey].tokens["native"]
        return {
            decimals,
            name,
            symbol,
        }
    }

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
    tokenAddress,
    chainKey,
    network
}: GetTokenMetadataParams): Promise<TokenMetadata> => {
    if (tokenAddress === "native") {
        const { decimals, symbol, name } =
    blockchainConfig().chains[chainKey].tokens["native"]
        return {
            decimals,
            name,
            symbol,
        }
    }
    network = network || Network.Testnet
    const umi = createUmi(solanaHttpRpcUrl(chainKey, network)).use(mplTokenMetadata())
    const asset = await fetchDigitalAsset(umi, publicKey(tokenAddress))

    return {
        name: asset.metadata.name,
        symbol: asset.metadata.symbol,
        decimals: asset.mint.decimals || 0,
    }
}

export const _getAlgorandTokenMetadata = async ({
    tokenAddress,
    chainKey,
    network
}: GetTokenMetadataParams): Promise<TokenMetadata> => {
    if (tokenAddress === "native") {
        const { decimals, symbol, name } =
    blockchainConfig().chains[chainKey].tokens["native"]
        return {
            decimals,
            name,
            symbol,
        }
    }
    network = network || Network.Testnet
    const assetId = BigInt(tokenAddress)
    const account = await algorandAlgodClient(network).getAssetByID(assetId).do()
    return {
        name: account.params.name || "",
        decimals: account.params.decimals || 0,
        symbol: account.params.unitName || "",
    }
}

export const _getSuiTokenMetadata = async ({
    chainKey,
    network,
    tokenAddress
}: GetTokenMetadataParams): Promise<TokenMetadata> => {
    if (!tokenAddress) throw new Error("Token address not found")
    if (tokenAddress === "native") {
        const { decimals, symbol, name } =
        blockchainConfig().chains[chainKey].tokens["native"]
        return {
            decimals,
            name,
            symbol,
        }
    }

    network = network || Network.Testnet
    const metadata = await suiClient(
        network
    ).getCoinMetadata({ coinType: tokenAddress })
    if (!metadata) throw new Error("Sui coin metadata not found")
    const { name, decimals, symbol } = metadata 

    return {
        name,
        decimals,
        symbol,
    }
}

export const _getTokenMetadata = async (params: GetTokenMetadataParams) => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Evm:
        return _getEvmTokenMetadata(params)
    case Platform.Aptos:
        return _getAptosTokenMetadata(params)
    case Platform.Solana:
        return _getSolanaTokenMetadata(params)
    case Platform.Algorand:
        return _getAlgorandTokenMetadata(params)
    case Platform.Sui:
        return _getSuiTokenMetadata(params)
    }
}
