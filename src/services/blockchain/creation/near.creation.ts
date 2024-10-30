import { KeyPair } from "near-api-js"
import { ChainAccount } from "../common"
import { CreateAccountParams, ImportAccountParams } from "./types.creation"
import { parseSeedPhrase } from "near-seed-phrase"
import { KeyPairString } from "near-api-js/lib/utils"

export const createNearAccount = async ({
    accountNumber,
    mnemonic,
}: Omit<CreateAccountParams, "chainKey">): Promise<ChainAccount> => {
    const { secretKey, publicKey } = parseSeedPhrase(
        mnemonic,
        `44'/397'/0'/0'/${accountNumber}`
    )
    return {
        address: publicKey,
        privateKey: secretKey,
        publicKey,
    }
}

export const importNearAccount = ({
    privateKey,
}: Omit<ImportAccountParams, "chainKey">): ChainAccount => {
    const keyPair =  KeyPair.fromString(privateKey as KeyPairString)
    return {
        address: keyPair.getPublicKey().toString(),
        privateKey: privateKey,
        publicKey: keyPair.getPublicKey().toString(),
    }
}
