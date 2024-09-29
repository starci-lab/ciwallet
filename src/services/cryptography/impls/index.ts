import { generateMnemonic, mnemonicToSeed } from "../bip39"
import { EncryptedResult, decrypt, encrypt } from "../encrypt"
import { generateAccount, secretKeyToMnemonic } from "algosdk"

export enum MnemonicWords {
  _12_WORDS,
  _24_WORDS,
  _25_WORDS,
}

export const getMnemonic = (
    mnemonicWords: MnemonicWords = MnemonicWords._12_WORDS
) => {
    const numWordsMap = {
        [MnemonicWords._12_WORDS]: 12,
        [MnemonicWords._24_WORDS]: 24,
        [MnemonicWords._25_WORDS]: 25,
    }
    if (mnemonicWords === MnemonicWords._12_WORDS || mnemonicWords === MnemonicWords._24_WORDS) {
        return generateMnemonic(numWordsMap[mnemonicWords])
    }

    //handle algorand case
    const account = generateAccount()
    return secretKeyToMnemonic(account.sk)

}

export interface EncryptMnemonicParams {
  password: string;
  mnemonic: string;
}

export const encryptMnemonic = ({
    password,
    mnemonic,
}: EncryptMnemonicParams): EncryptedResult => {
    return encrypt({
        key: password,
        data: mnemonic,
    })
}

export interface DecryptMnemonicParams {
  password: string;
  encryptedResult: EncryptedResult;
}

export const decryptMnemonic = ({
    password,
    encryptedResult: { data, iv },
}: DecryptMnemonicParams): string => {
    return decrypt({
        key: password,
        iv,
        encryptedData: data,
    })
}

export interface EncryptAlgorandMnemonicsParams {
    password: string;
    algorandMnemonics: Array<string>;
  }
  
export const encryptAlgorandMnemonics = ({
    password,
    algorandMnemonics,
}: EncryptAlgorandMnemonicsParams): EncryptedResult => {
    return encrypt({
        key: password,
        data: algorandMnemonics.join(","),
    })
}
  
export interface DecryptAlgorandMnemonicsParams {
    password: string;
    encryptedResult: EncryptedResult;
  }
  
export const decryptAlgorandMnemonics = ({
    password,
    encryptedResult: { data, iv },
}: DecryptAlgorandMnemonicsParams): Array<string> => {
    const decrypted = decrypt({
        key: password,
        iv,
        encryptedData: data,
    })
    return decrypted.split(",")
}
  

export interface GetSeedParams {
  accountNumber: number;
  mnemonic: string;
}

export const getSeed = ({ accountNumber, mnemonic }: GetSeedParams): Buffer => {
    return mnemonicToSeed({
        mnemonic,
        password: accountNumber.toString(),
    })
}
