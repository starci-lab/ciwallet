import { TokenInfos, defaultChainKey } from "@/config"
import {
    EncryptMnemonicParams,
    EncryptedResult,
    decrypt,
    encrypt,
} from "../cryptography"
import { AccountNumbers, StoredVaa } from "@/redux"
import { deserialize, serialize } from "./serialization.local-storage"

const ACCOUNT_NUMBERS = "account-numbers"
const ENCRYPTED_MNEMONIC = "encrypted-mnemonic"
const PREFERENCE_CHAIN = "preference-chain"
const VAAS = "vaas"
const TOKENS = "tokens"

export const saveAccountNumbers = (accountNumbers: AccountNumbers) => {
    localStorage.setItem(ACCOUNT_NUMBERS, serialize(accountNumbers))
}

export const loadAccountNumbers = (): AccountNumbers | null => {
    const found = localStorage.getItem(ACCOUNT_NUMBERS)
    return found !== null ? deserialize(found) : null
}

export const saveEncryptedMnemonic = ({
    mnemonic,
    password,
}: EncryptMnemonicParams) => {
    const result = encrypt({
        data: mnemonic,
        key: password,
    })
    localStorage.setItem(ENCRYPTED_MNEMONIC, serialize(result))
}

export const loadMnemonic = (password: string) => {
    const found = localStorage.getItem(ENCRYPTED_MNEMONIC)
    if (!found) return ""
    const encryptedResult = deserialize(found) as EncryptedResult
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
    localStorage.setItem(VAAS, serialize(vaas))
}

export const loadVaas = (): Array<StoredVaa> | null => {
    const found = localStorage.getItem(VAAS)
    return found !== null ? deserialize(found) : null
}

export const saveTokens = (tokens: Record<string, TokenInfos>) => {
    localStorage.setItem(TOKENS, serialize(tokens))
}

export const loadTokens = (): Record<string, TokenInfos> | null => {
    const found = localStorage.getItem(TOKENS)
    return found !== null ? deserialize(found) : null
}
