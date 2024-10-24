import {
    mnemonicToMiniSecret,
    encodeAddress,
    sr25519PairFromSeed,
    cryptoWaitReady
} from "@polkadot/util-crypto"
import { hexToU8a, u8aToHex } from "@polkadot/util"
import { ChainAccount } from "../common"
import { CreateAccountParams, ImportAccountParams } from "./types.creation"

export const createPolkadotAccount = async ({
    accountNumber,
    mnemonic,
}: Omit<CreateAccountParams, "chainKey">): Promise<ChainAccount> => {
    await cryptoWaitReady()
    const seed = mnemonicToMiniSecret(mnemonic, accountNumber.toString())
    const { publicKey, secretKey} = sr25519PairFromSeed(seed)
    return {
        address: encodeAddress(publicKey),
        privateKey: u8aToHex(secretKey),
        publicKey: u8aToHex(publicKey),
    }
}

export const importPolkadotAccount = ({
    privateKey,
}: Omit<ImportAccountParams, "chainKey">): ChainAccount => {
    const { publicKey, secretKey} = sr25519PairFromSeed((hexToU8a(privateKey)))
    return {
        address: encodeAddress(publicKey),
        privateKey: u8aToHex(secretKey),
        publicKey: u8aToHex(publicKey),
    }
}
