import { defaultChainKey } from "@/config"
import { EncryptMnemonicParams, EncryptedResult, decrypt, encrypt } from "../cryptography"
import { AccountNumbers, StoredVaa } from "@/redux"

const ACCOUNT_NUMBERS = "account-numbers"
const ENCRYPTED_MNEMONIC = "encrypted-mnemonic"
const PREFERENCE_CHAIN = "preference-chain"
const VAAS = "vaas"

export const saveAccountNumbers = (accountNumbers: AccountNumbers) => {
    localStorage.setItem(ACCOUNT_NUMBERS, JSON.stringify(accountNumbers))
}

export const loadAccountNumbers = (): AccountNumbers | null => {
    const found = localStorage.getItem(ACCOUNT_NUMBERS)
    return found !== null
        ? JSON.parse(found)
        : null
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

export const saveVaas = (vaas: Array<StoredVaa>) => {
    localStorage.setItem(VAAS, JSON.stringify(vaas))
}

export const loadVaas = (): Array<StoredVaa> | null => {
    const found = localStorage.getItem(VAAS)
    return found !== null
        ? JSON.parse(found)
        : null
}