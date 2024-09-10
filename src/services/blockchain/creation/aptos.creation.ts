import { Account } from "@aptos-labs/ts-sdk"
import { ChainAccount } from "../common"
import { CreateAccountParams } from "./types.creation"

export const _createAptosAccount = ({
    accountNumber,
    mnemonic,
}: Omit<CreateAccountParams, "chainKey">): ChainAccount => {
    const account = Account.fromDerivationPath({
        mnemonic,
        path: `m/44'/637'/${accountNumber}'/0'/0'`,
    })
    return {
        address: account.accountAddress.toString(),
        privateKey: account.privateKey.toString(),
        publicKey: account.publicKey.toString(),
    }
}
