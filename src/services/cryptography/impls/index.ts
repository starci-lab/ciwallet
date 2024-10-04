import { generateMnemonic, mnemonicToSeed } from "../bip39"
import { EncryptedResult, decrypt, encrypt } from "../encrypt"

export enum MnemonicWords {
  _12_WORDS,
  _24_WORDS,
}

export const getMnemonic = (
    mnemonicWords: MnemonicWords = MnemonicWords._12_WORDS
) => {
    const numWordsMap = {
        [MnemonicWords._12_WORDS]: 12,
        [MnemonicWords._24_WORDS]: 24,
    }
    return generateMnemonic(numWordsMap[mnemonicWords])
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
