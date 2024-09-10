import { ChainAccount } from "../common"
import { getSeed } from "../../cryptography"
import { Keypair } from "@solana/web3.js"
import { CreateAccountParams } from "./types.creation"

export const createSolanaAccount = ({
    accountNumber,
    mnemonic,
}: Omit<CreateAccountParams, "chainKey">): ChainAccount => {
    const seed = getSeed({
        mnemonic,
        accountNumber,
    })
    const account = Keypair.fromSeed(seed.subarray(0, 32))
    return {
        address: account.publicKey.toString(),
        privateKey: Buffer.from(account.secretKey).toString("hex"),
        publicKey: account.publicKey.toString(),
    }
}
