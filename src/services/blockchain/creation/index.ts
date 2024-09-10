import { Platform, chainKeyToPlatform } from "../common"
import { _createAptosAccount } from "./aptos.creation"
import { _createEvmAccount } from "./evm.creation"
import { _createSolanaAccount } from "./solana.creation"
import { CreateAccountParams } from "./types.creation"

export const _createAccount = ({ accountNumber, chainKey, mnemonic}: CreateAccountParams) => {
    const platform = chainKeyToPlatform(chainKey)
    switch (platform) {
    case Platform.Evm: return _createEvmAccount({
        accountNumber,
        mnemonic
    }) 
    case Platform.Aptos: return _createAptosAccount({
        accountNumber,
        mnemonic
    })
    case Platform.Solana: return _createSolanaAccount({
        accountNumber,
        mnemonic
    })
    }
} 