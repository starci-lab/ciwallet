import { Wallet } from "ethers"
import { Platform, chainKeyToPlatform } from "../common"
import nacl from "tweetnacl"
import { Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk"
import algosdk from "algosdk"
import bs58 from "bs58"

export interface SignMessageParams {
  message: string;
  privateKey: string;
  chainKey: string;
}

export const evmSignMessage = ({ message, privateKey }: SignMessageParams) => {
    const wallet = new Wallet(privateKey)
    return wallet.signMessage(message)
}

export const solanaSignMessage = ({
    message,
    privateKey,
}: SignMessageParams) => {
    return Buffer.from(
        nacl.sign.detached(Buffer.from(message, "base64"), bs58.decode(privateKey))
    ).toString("base64")
}

export const aptosSignMessage = ({
    message,
    privateKey,
}: SignMessageParams) => {
    const ed25519PrivateKey = Account.fromPrivateKey({
        privateKey: new Ed25519PrivateKey(privateKey),
    })
    return ed25519PrivateKey.sign(message).toString()
}

export const algorandSignMessage = ({
    message,
    privateKey,
}: SignMessageParams) => {
    return Buffer.from(
        algosdk.signBytes(
            Buffer.from(message, "base64"),
            Buffer.from(privateKey, "hex")
        )
    ).toString("base64")
}

export const signMessage = (params: SignMessageParams) => {
    const platform = chainKeyToPlatform(params.chainKey)

    switch (platform) {
    case Platform.Evm: {
        return evmSignMessage(params)
    }
    case Platform.Solana: {
        return solanaSignMessage(params)
    }
    case Platform.Aptos: {
        return aptosSignMessage(params)
    }
    case Platform.Algorand: {
        return algorandSignMessage(params)
    }
    default:
        throw new Error(`Platform not supported: ${platform}`)
    }
}
