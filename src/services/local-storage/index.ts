import { defaultChainKey } from "@/config"
import { EncryptMnemonicParams, EncryptedResult, decrypt, encrypt } from "../cryptography"
import { AccountNumbers } from "@/redux"

const ACCOUNT_NUMBERS = "account-numbers"
const ENCRYPTED_MNEMONIC = "encrypted-mnemonic"
const PREFERENCE_CHAIN = "preference-chain"

export const saveAccountNumbers = (accountNumbers: AccountNumbers) => {
    localStorage.setItem(ACCOUNT_NUMBERS, JSON.stringify(accountNumbers))
}

export const loadAccountNumber = (): AccountNumbers => {
    const found = localStorage.getItem(ACCOUNT_NUMBERS)
    return found
        ? JSON.parse(found)
        : {
            aptos: 0,
            solana: 0,
        }
}

export const saveEncryptedMnemonic = ({
    mnemonic,
    password,
}: EncryptMnemonicParams) => {
    const result = encrypt({
        data: mnemonic,
        key: password,
    })
    localStorage.setItem(ENCRYPTED_MNEMONIC, JSON.stringify(result))
}

export const loadMnemonic = (password: string) => {
    const found = localStorage.getItem(ENCRYPTED_MNEMONIC)
    if (!found) return ""
    const encryptedResult = JSON.parse(found) as EncryptedResult
    return decrypt({
        key: password,
        encryptedData: encryptedResult.data,
        iv: encryptedResult.iv,
    })
}

export const foundEncryptedMnemonic = () => {
    return !!localStorage.getItem(ENCRYPTED_MNEMONIC)
}

export const savePreferenceChainKey = (preferenceChainKey: string) => {
    localStorage.setItem(PREFERENCE_CHAIN, preferenceChainKey)
}

export const loadPreferenceChainKey = () => {
    return localStorage.getItem(PREFERENCE_CHAIN) ?? defaultChainKey
}
