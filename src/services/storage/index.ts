import { ChainInfo, defaultChainKey } from "@/config"
import {
    EncryptMnemonicParams,
    EncryptedResult,
    decrypt,
    encrypt,
} from "../cryptography"
import { AccountNumbers, StoredVaa } from "@/redux"
import { deserialize, serialize } from "./serialization.storage"

const ACCOUNT_NUMBERS = "ciwallet-account-numbers"
const ENCRYPTED_MNEMONIC = "ciwallet-encrypted-mnemonic"
const PREFERENCE_CHAIN = "ciwallet-preference-chain"
const VAAS = "ciwallet-vaas"
const CHAINS = "ciwallet-chains"

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

export const clearStorage = () => {
    localStorage.removeItem(VAAS)
    localStorage.removeItem(PREFERENCE_CHAIN)
    localStorage.removeItem(CHAINS)
    localStorage.removeItem(ACCOUNT_NUMBERS)
    localStorage.removeItem(ENCRYPTED_MNEMONIC)
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

export const saveChains = (chains: Record<string, ChainInfo>) => {
    localStorage.setItem(CHAINS, serialize(chains))
}

export const loadChains = (): Record<string, ChainInfo> | null => {
    const found = localStorage.getItem(CHAINS)
    return found !== null ? deserialize(found) : null
}
