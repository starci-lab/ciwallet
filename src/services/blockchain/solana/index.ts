import { Keypair } from "@solana/web3.js"
import { getSeed } from "@/services"

export interface CreateSolanaAccountParams {
    mnemonic: string;
    accountNumber: number;
  }
  
export const createSolanaAccount = ({
    mnemonic,
    accountNumber
}: CreateSolanaAccountParams) => {
    const seed = getSeed({
        mnemonic,
        accountNumber,
    })
    return Keypair.fromSeed(
        seed.subarray(0, 32)
    )
}