import { ChainAccount, Platform, chainKeyToPlatform } from "../common"
import { createAlgorandAccount, importAlgorandAccount } from "./algorand.creation"
import { createAptosAccount, importAptosAccount } from "./aptos.creation"
import { createEvmAccount, importEvmAccount } from "./evm.creation"
import { createSolanaAccount, importSolanaAccount } from "./solana.creation"
import { createSuiAccount, importSuiAccount } from "./sui.creation"
import { CreateAccountParams, ImportAccountParams } from "./types.creation"

export const createAccount = ({
    accountNumber,
    chainKey,
    mnemonic,
}: CreateAccountParams): ChainAccount => {
    if (mnemonic === "")
        return {
            address: "",
            privateKey: "",
            publicKey: "",
        }

    const platform = chainKeyToPlatform(chainKey)
    switch (platform) {
    case Platform.Evm:
        return createEvmAccount({
            accountNumber,
            mnemonic,
        })
    case Platform.Aptos:
        return createAptosAccount({
            accountNumber,
            mnemonic,
        })
    case Platform.Solana:
        return createSolanaAccount({
            accountNumber,
            mnemonic,
        })
    case Platform.Algorand:
        return createAlgorandAccount({
            accountNumber,
            mnemonic,
        })
    case Platform.Sui:
        return createSuiAccount({
            accountNumber,
            mnemonic,
        })
    }
}

export const importAccount = ({
    privateKey,
    chainKey,
    accountAddress,
}: ImportAccountParams): ChainAccount => {
    if (privateKey === "")
        return {
            address: "",
            privateKey: "",
            publicKey: "",
        }

    const platform = chainKeyToPlatform(chainKey)
    switch (platform) {
    case Platform.Evm:
        return importEvmAccount({
            privateKey,
        })
    case Platform.Aptos:
        return importAptosAccount({
            privateKey,
            accountAddress
        })
    case Platform.Solana:
        return importSolanaAccount({
            privateKey
        })
    case Platform.Algorand:
        return importAlgorandAccount({
            privateKey
        })
    case Platform.Sui:
        return importSuiAccount({
            privateKey
        })
    }
}

