import { Wallet } from "ethers"
import { Platform, chainKeyToPlatform } from "../common"

export interface SignMessageParams {
    message: string,
    privateKey: string,
    chainKey: string
}

export const evmSignMessage = ({ message, privateKey }: SignMessageParams) => {
    const wallet = new Wallet(privateKey)
    return wallet.signMessage(message)
}

export const signMessage = (params: SignMessageParams) => {
    const platform = chainKeyToPlatform(params.chainKey)

    switch (platform) {
    case Platform.Evm: {
        return evmSignMessage(params)
    }
    default: throw new Error(`Platform not supported: ${platform}`)
    }
}