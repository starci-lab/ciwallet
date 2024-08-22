import axios from "axios"
import { EncryptedResult } from "../cryptography"

export const getMnemonic = async (): Promise<string> => {
    const url = "/api/mnemonic"
    const { data } = await axios.post(url)
    return data
}

export interface EncryptMnemonicParams {
  password: string;
  mnemonic: string;
}

export const encryptMnemonic = async (
    params: EncryptMnemonicParams
): Promise<EncryptedResult> => {
    const url = "/api/encrypt"
    const { data } = await axios.post(url, params)
    return data
}

export interface DecryptMnemonicParams {
  password: string;
  encryptedResult: EncryptedResult;
}

export const decryptMnemonic = async (
    params: DecryptMnemonicParams
): Promise<string> => {
    const url = "/api/decrypt"
    const { data } = await axios.post(url, params)
    return data
}

export interface GetSeedParams {
    accountNumber: number;
    mnemonic: string;
}
  
export const getSeed = async (
    params: GetSeedParams
): Promise<Buffer> => {
    const url = "/api/seed"
    const { data } = await axios.post(url, params)
    return Buffer.from(data, "base64")
}
  