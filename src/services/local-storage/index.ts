import { defaultChainKey } from "@/config"
import { EncryptedResult } from "../cryptography"
import { EncryptMnemonicParams, decryptMnemonic, encryptMnemonic } from "../routes"

const ACCOUNT_NUMBER = "account-number"
const ENCRYPTED_MNEMONIC = "encrypted-mnemonic"
const PREFERENCE_CHAIN = "preference-mnemonic"

export const saveAccountNumber = (accountNumber: string) => {
    localStorage.setItem(ACCOUNT_NUMBER, accountNumber)
}

export const loadAccountNumber = () => {
    const found = localStorage.getItem(ACCOUNT_NUMBER)
    return found ? Number.parseInt(found) : 0
}

export const saveEncryptedMnemonic = async (
    params: EncryptMnemonicParams
) => {
    const result = await encryptMnemonic(params)
    localStorage.setItem(ENCRYPTED_MNEMONIC, JSON.stringify(result))
}

export const loadMnemonic = async (password: string) => {
    const found = localStorage.getItem(ENCRYPTED_MNEMONIC)
    if (!found) return ""
    const encryptedResult = JSON.parse(found) as EncryptedResult
    return await decryptMnemonic({ password, encryptedResult })
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