import { mnemonicToSecretKey, mnemonicFromSeed } from "algosdk"
import { ChainAccount } from "../common"
import { getSeed } from "../../cryptography"
import { CreateAccountParams } from "./types.creation"

export const createAlgorandAccount = ({
    mnemonic,
    accountNumber
}: Omit<CreateAccountParams, "chainKey">): ChainAccount => {
    const seed = getSeed({
        mnemonic,
        accountNumber,
    })
    const algorandMnemonic = mnemonicFromSeed(seed.subarray(0, 32))
    const account = mnemonicToSecretKey(algorandMnemonic)
    return {
        address: account.addr.toString(),
        privateKey: Buffer.from(account.sk).toString("hex"),
        publicKey: account.addr.toString(),
    }
}
