import { Chain, TokenAddress } from "@wormhole-foundation/sdk"
import {
    aptosExplorerUrls,
    createAptosAccount,
    getAptosBalance,
} from "../aptos"
import { ChainAccount, Network } from "../common"
import {
    createSolanaAccount,
    getSolanaBalance,
    solanaExplorerUrls,
} from "../solana"
import { AptosChains } from "@wormhole-foundation/sdk-aptos"
import { SolanaChains } from "@wormhole-foundation/sdk-solana"

export interface GetBalanceParams {
  accountAddress: string;
  tokenAddress: TokenAddress<Chain>;
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
        tokenAddress as unknown as TokenAddress<AptosChains>,
        network
        )
    case "solana":
        return getSolanaBalance(
            accountAddress,
        tokenAddress as unknown as TokenAddress<SolanaChains>,
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
        return createAptosAccount({ mnemonic, accountNumber })
    case "solana":
        return createSolanaAccount({ mnemonic, accountNumber })
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
    default:
        throw new Error("Invalid chain key")
    }
}
