import {
    mnemonicToMiniSecret,
    ed25519PairFromSeed,
    encodeAddress,
    ed25519PairFromSecret,
} from "@polkadot/util-crypto"
import { hexToU8a, u8aToHex } from "@polkadot/util"
import { ChainAccount } from "../common"
import { CreateAccountParams, ImportAccountParams } from "./types.creation"

export const createPolkadotAccount = ({
    accountNumber,
    mnemonic,
}: Omit<CreateAccountParams, "chainKey">): ChainAccount => {
    const seed = mnemonicToMiniSecret(mnemonic, accountNumber.toString())
    const { publicKey, secretKey} = ed25519PairFromSeed(seed)
    return {
        address: encodeAddress(publicKey),
        privateKey: u8aToHex(secretKey),
        publicKey: u8aToHex(publicKey),
    }
}

export const importPolkadotAccount = ({
    privateKey,
}: Omit<ImportAccountParams, "chainKey">): ChainAccount => {
    const { publicKey, secretKey} = ed25519PairFromSecret((hexToU8a(privateKey)))
    return {
        address: encodeAddress(publicKey),
        privateKey: u8aToHex(secretKey),
        publicKey: u8aToHex(publicKey),
    }
}
