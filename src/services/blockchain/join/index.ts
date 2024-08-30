import { TokenAddress } from "@wormhole-foundation/sdk"
import {
    aptosExplorerUrls,
    createAptosAccount,
    getAptosBalance,
    getAptosTokenMetadata,
} from "../aptos"
import { ChainAccount, Network } from "../common"
import {
    createSolanaAccount,
    getSolanaBalance,
    getSolanaTokenMetadata,
    solanaExplorerUrls,
} from "../solana"
import { SolanaChains } from "@wormhole-foundation/sdk-solana"
import { createEvmAccount, bscExplorerUrls, getBscBalance } from "../evm"

export interface GetBalanceParams {
  accountAddress: string;
  tokenAddress: string;
  chainKey: string;
  network?: Network;
}

export const getBalance = async ({
    tokenAddress,
    accountAddress,
    chainKey,
    network,
}: GetBalanceParams) => {
    network = network || Network.Testnet

    switch (chainKey) {
    case "aptos":
        return getAptosBalance(
            accountAddress,
            tokenAddress,
            network
        )
    case "solana":
        return getSolanaBalance(
            accountAddress,
            tokenAddress,
            network
        )
    case "bsc":
        return getBscBalance(
            accountAddress,
            tokenAddress,
            network
        )
    default:
        throw new Error("Invalid chain key")
    }
}

export interface CreateAccountParams {
  mnemonic: string;
  accountNumber: number;
  chainKey: string;
}

export const createAccount = ({
    mnemonic,
    accountNumber,
    chainKey,
}: CreateAccountParams): ChainAccount => {
    if (!mnemonic)
        return {
            address: "",
            privateKey: "",
            publicKey: "",
        }
    switch (chainKey) {
    case "aptos":
        return createAptosAccount(mnemonic, accountNumber)
    case "solana":
        return createSolanaAccount(mnemonic, accountNumber)
    case "bsc":
        return createEvmAccount(mnemonic, accountNumber)
    default:
        throw new Error("Invalid chain key")
    }
}

export interface GetExplorerUrlParams {
  value: string;
  network?: Network;
  chainKey: string;
  type?: "address" | "tx";
}

export const getExplorerUrl = ({
    chainKey,
    value,
    network,
    type,
}: GetExplorerUrlParams) => {
    network = network || Network.Testnet
    type = type || "address"

    switch (chainKey) {
    case "aptos":
        return aptosExplorerUrls(value, network)[type]
    case "solana":
        return solanaExplorerUrls(value, network)[type]
    case "bsc":
        return bscExplorerUrls(value, network)[type]
    default:
        throw new Error("Invalid chain key")
    }
}

export interface GetTokenMetadataParams {
  tokenAddress: string;
  network?: Network;
  chainKey: string;
}

export const getTokenMetadata = async ({
    chainKey,
    tokenAddress,
    network,
}: GetTokenMetadataParams) => {
    network = network || Network.Testnet

    switch (chainKey) {
    case "aptos":
        return await getAptosTokenMetadata(
            tokenAddress,
            network
        )
    case "solana":
        return await getSolanaTokenMetadata(
        tokenAddress as TokenAddress<SolanaChains>,
        network
        )
    default:
        throw new Error("Invalid chain key")
    }
}
