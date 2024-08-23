import {
    generateMnemonic as _generateMnemonic,
    mnemonicToSeedSync,
} from "bip39"
import { sha256Hash } from "../sha256"

export const generateMnemonic = () => _generateMnemonic()

export interface MnemonicToSeedParams {
  mnemonic: string;
  password: string;
  salt?: string
}

export const mnemonicToSeed = ({
    mnemonic,
    password
}: MnemonicToSeedParams) =>
    mnemonicToSeedSync(
        mnemonic,
        sha256Hash(password).substring(0, 32)
    )

