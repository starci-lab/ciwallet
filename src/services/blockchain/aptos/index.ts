export enum Network {
  Testnet,
  Mainnet,
}
import { computeDenomination } from "@/utils"
import {
    AptosConfig,
    Aptos,
    Network as AptosNetwork,
    Account,
} from "@aptos-labs/ts-sdk"

export const aptosConfig = (network: Network = Network.Testnet) => {
    const networkMap: Record<Network, AptosNetwork> = {
        [Network.Mainnet]: AptosNetwork.MAINNET,
        [Network.Testnet]: AptosNetwork.TESTNET,
    }
    return new AptosConfig({ network: networkMap[network] })
}
export const aptos = (network: Network = Network.Testnet) =>
    new Aptos(aptosConfig(network))

export const getAptosBalance = async (
    address: string,
    network: Network = Network.Testnet
) => {
    const amount = await aptos(network).getAccountAPTAmount({
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
