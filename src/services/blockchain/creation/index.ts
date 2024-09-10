import { Platform, chainKeyToPlatform } from "../common"
import { createAptosAccount } from "./aptos.creation"
import { createEvmAccount } from "./evm.creation"
import { createSolanaAccount } from "./solana.creation"
import { CreateAccountParams } from "./types.creation"

export const createAccount = ({ accountNumber, chainKey, mnemonic}: CreateAccountParams) => {
    const platform = chainKeyToPlatform(chainKey)
    switch (platform) {
    case Platform.Evm: return createEvmAccount({
        accountNumber,
        mnemonic
    }) 
    case Platform.Aptos: return createAptosAccount({
        accountNumber,
        mnemonic
    })
    case Platform.Solana: return createSolanaAccount({
        accountNumber,
        mnemonic
    })
    }
} 