import { Keypair } from "@solana/web3.js"
import { getSeed } from "../../routes"

export interface CreateSolanaAccountParams {
    mnemonic: string;
    accountNumber: number;
  }
  
export const createSolanaAccount = async ({
    mnemonic,
    accountNumber
}: CreateSolanaAccountParams) => {
    const seed = await getSeed({
        mnemonic,
        accountNumber,
    })
    return Keypair.fromSeed(
        seed.subarray(0, 32)
    )
}