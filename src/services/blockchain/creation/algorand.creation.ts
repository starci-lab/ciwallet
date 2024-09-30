import { mnemonicToSecretKey,  } from "algosdk"
import { ChainAccount } from "../common"
import { CreateAccountParams } from "./types.creation"

export const createAlgorandAccount = ({
    mnemonic,
}: Omit<CreateAccountParams, "chainKey">): ChainAccount => {
    if (!mnemonic) return {
        address: "",
        privateKey: "",
        publicKey: ""
    }
    const account = mnemonicToSecretKey(mnemonic)
    return {
        address: account.addr.toString(),
        privateKey: Buffer.from(account.sk).toString("hex"),
        publicKey: account.addr.toString(),
    }
}
