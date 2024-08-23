import { computeDenomination } from "@/utils"
import {
    AptosConfig,
    Aptos,
    Network as AptosNetwork,
    Account,
} from "@aptos-labs/ts-sdk"
import { Network } from "../common"

export const aptosConfig = (network: Network = Network.Testnet) => {
    const networkMap: Record<Network, AptosNetwork> = {
        [Network.Devnet]: AptosNetwork.DEVNET,
        [Network.Mainnet]: AptosNetwork.MAINNET,
        [Network.Testnet]: AptosNetwork.TESTNET,
    }
    return new AptosConfig({ network: networkMap[network] })
}
export const aptosClient = (network: Network = Network.Testnet) =>
    new Aptos(aptosConfig(network))

export const getAptosBalance = async (
    address: string,
    network: Network = Network.Testnet
) => {
    const amount = await aptosClient(network).getAccountAPTAmount({
        accountAddress: address,
    })
    return computeDenomination(amount)
}

export interface CreateAptosAccountParams {
  mnemonic: string;
  accountNumber: number;
}

export const createAptosAccount = ({
    mnemonic,
    accountNumber,
}: CreateAptosAccountParams) => {
    return Account.fromDerivationPath({
        mnemonic,
        path: `m/44'/637'/${accountNumber}'/0'/0'`,
    })
}

export const aptosNodes: Record<Network, string> = {
    [Network.Devnet]: "https://api.devnet.aptoslabs.com/v1",
    [Network.Mainnet]: "https://api.mainnet.aptoslabs.com/v1",
    [Network.Testnet]: "https://api.testnet.aptoslabs.com/v1",
}