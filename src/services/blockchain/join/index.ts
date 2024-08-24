import { aptosExplorerUrls, createAptosAccount, getAptosBalance } from "../aptos"
import { Network } from "../common"
import { createSolanaAccount, getSolanaBalance, solanaExplorerUrls } from "../solana"

export interface GetBalanceParams {
  address: string;
  chainKey: string;
  network?: Network;
}

export const getBalance = async ({
    address,
    chainKey,
    network,
}: GetBalanceParams) => {
    network = network || Network.Testnet

    switch (chainKey) {
    case "aptos":
        return getAptosBalance(address, network)
    case "solana":
        return getSolanaBalance(address, network)
    default:
        throw new Error("Invalid chain key")
    }
}

export interface CreateAccountParams {
    mnemonic: string;
    accountNumber: number;
    chainKey: string;
}

export const createAccount = ({ mnemonic, accountNumber, chainKey }: CreateAccountParams) => {
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
