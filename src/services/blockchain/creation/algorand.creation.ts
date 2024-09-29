import { mnemonicToSecretKey,  } from "algosdk"
import { ChainAccount } from "../common"
import { CreateAccountParams } from "./types.creation"

export const createAlgorandAccount = ({
    mnemonic,
}: Omit<CreateAccountParams, "chainKey">): ChainAccount => {
    const account = mnemonicToSecretKey(mnemonic)
    return {
        address: account.addr.toString(),
        privateKey: account.sk.toString(),
        publicKey: account.addr.toString(),
    }
}
